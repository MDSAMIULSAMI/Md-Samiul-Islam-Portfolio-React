/**
 * Production static server for the built SPA.
 *
 * Railway (and any container host) runs a long lived process and routes traffic
 * to $PORT, so `vite` and `vite preview` are not an option: the dev server
 * ignores $PORT and binds to localhost, which fails the health check and puts
 * the container in a restart loop.
 *
 * Zero dependencies on purpose, so the free tier footprint stays small.
 *
 * Nothing is compressed per request. `npm run build` writes a .br and a .gz
 * next to every compressible artefact and this serves those bytes straight off
 * disk. Compressing the main bundle on each hit instead cost ~18 ms of CPU per
 * request and pinned four cores at roughly 250 req/s, which is the entire
 * capacity of a small container spent on work whose answer never changes.
 */
import { createReadStream, promises as fs } from "node:fs";
import { createServer } from "node:http";
import { gzipSync } from "node:zlib";
import { extname, join, normalize, resolve, sep } from "node:path";
import { pipeline } from "node:stream/promises";

const ROOT = resolve(import.meta.dirname, "dist");
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

// Kept in step with the precompress plugin in vite.config.js. Drift is not
// dangerous in either direction: a variant the build writes and this never
// looks for is only wasted build time, and one this looks for and does not
// find is compressed once into memory below.
const COMPRESSIBLE = new Set([
  ".html", ".js", ".mjs", ".css", ".json", ".svg", ".txt", ".xml", ".map", ".webmanifest",
]);

// A visitor who navigates away mid download tears the socket down. That is
// their prerogative, not a fault, and a stack trace per occurrence buries the
// failures that do matter.
const CLIENT_ABORT = new Set(["ERR_STREAM_PREMATURE_CLOSE", "EPIPE", "ECONNRESET"]);

/** stat a path, or null if it is missing or is not a regular file. */
async function statFile(path) {
  try {
    const stat = await fs.stat(path);
    return stat.isFile() ? stat : null;
  } catch {
    return null;
  }
}

/**
 * Resolve a URL path to a file inside ROOT, with its stat, or null if it
 * escapes the root or does not exist.
 */
async function resolveFile(urlPath) {
  const target = resolve(join(ROOT, normalize(urlPath)));
  if (target !== ROOT && !target.startsWith(ROOT + sep)) return null; // traversal

  const stat = await statFile(target);
  if (stat) return { file: target, stat };

  // A directory means the build prerendered that route's <head> into
  // dist/<route>/index.html. Serving it is what gives /projects its own title,
  // description and share card in the HTML response, which is the only version
  // a crawler that does not run JavaScript ever sees.
  const index = join(target, "index.html");
  const indexStat = await statFile(index);
  return indexStat ? { file: index, stat: indexStat } : null;
}

/**
 * Every encoding a file can be served as, resolved once and remembered.
 *
 * Keyed by path plus size and mtime, so rebuilding under a running server
 * invalidates the entry instead of serving the previous build's bytes. The key
 * space is bounded by the number of files in dist, so it never needs eviction.
 */
const VARIANTS = new Map();

async function variantsFor(file, stat) {
  const key = `${file}:${stat.size}:${stat.mtimeMs}`;
  const cached = VARIANTS.get(key);
  if (cached) return cached;

  const entry = {
    // Two different encodings of one URL are two different bodies, so they must
    // not share a validator: a cache holding the gzip copy under an etag would
    // otherwise answer a client that asked for identity with it.
    etagBase: `${stat.size.toString(36)}-${Math.floor(stat.mtimeMs).toString(36)}`,
    identity: { file, size: stat.size },
    br: null,
    gzip: null,
  };

  if (COMPRESSIBLE.has(extname(file).toLowerCase())) {
    const br = await statFile(`${file}.br`);
    if (br) entry.br = { file: `${file}.br`, size: br.size };

    const gz = await statFile(`${file}.gz`);
    if (gz) entry.gzip = { file: `${file}.gz`, size: gz.size };

    // No .gz means the build skipped precompression. Compressing once and
    // keeping the bytes costs a single pause on the first hit; compressing on
    // every hit is the thing this whole arrangement exists to avoid.
    if (!entry.gzip) {
      const buffer = gzipSync(await fs.readFile(file), { level: 9 });
      entry.gzip = { buffer, size: buffer.length };
    }
  }

  VARIANTS.set(key, entry);
  return entry;
}

/** Pick the smallest encoding the client said it can read. */
function negotiate(variants, accept = "") {
  if (variants.br && /\bbr\b/.test(accept)) return ["br", variants.br];
  if (variants.gzip && /\bgzip\b/.test(accept)) return ["gzip", variants.gzip];
  return ["identity", variants.identity];
}

const server = createServer(async (req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { Allow: "GET, HEAD" }).end("Method Not Allowed");
      return;
    }

    let pathname;
    try {
      pathname = decodeURIComponent(req.url.split("?")[0]);
    } catch {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" }).end("Bad Request");
      return;
    }

    const requested = pathname === "/" ? "/index.html" : pathname;
    let found = await resolveFile(requested);

    // Only an extensionless path can be a client side route, so only those fall
    // back to the shell, and /experience survives a direct hit or a refresh.
    if (!found && !extname(requested)) found = await resolveFile("/index.html");

    if (!found) {
      // Anything with an extension was a request for a real file. Answering a
      // missing /assets/index-abc123.js with 200 and a page of HTML breaks a
      // stale client somewhere far from the cause and hides build mistakes,
      // so it gets the status it actually deserves.
      const shellMissing = requested === "/index.html";
      res
        .writeHead(shellMissing ? 500 : 404, { "Content-Type": "text/plain; charset=utf-8" })
        .end(shellMissing ? "Build output missing" : "Not Found");
      return;
    }

    const variants = await variantsFor(found.file, found.stat);
    const [encoding, chosen] = negotiate(variants, req.headers["accept-encoding"]);

    const ext = extname(found.file).toLowerCase();
    const isShell = found.file.endsWith(`${sep}index.html`);
    const etag = `W/"${variants.etagBase}-${encoding}"`;

    const headers = {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      // Hashed filenames can be cached forever; the shell never can.
      "Cache-Control": isShell ? "no-cache" : "public, max-age=31536000, immutable",
      "Content-Length": chosen.size,
      ETag: etag,
    };
    if (encoding !== "identity") headers["Content-Encoding"] = encoding;
    // Only say the response varies when it actually does, so a shared cache
    // does not split its storage across encodings for files with one form.
    if (variants.br || variants.gzip) headers.Vary = "Accept-Encoding";

    // The shell revalidates on every visit because it is `no-cache`. Answering
    // that with an empty 304 is what makes a repeat visit cost nothing.
    const inm = req.headers["if-none-match"];
    if (inm && inm.split(",").some((tag) => tag.trim() === etag)) {
      res.writeHead(304, {
        ETag: etag,
        "Cache-Control": headers["Cache-Control"],
        ...(headers.Vary ? { Vary: headers.Vary } : {}),
      });
      res.end();
      return;
    }

    res.writeHead(200, headers);

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    if (chosen.buffer) res.end(chosen.buffer);
    else await pipeline(createReadStream(chosen.file), res);
  } catch (err) {
    if (CLIENT_ABORT.has(err.code)) return;
    if (!res.headersSent) res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
    console.error("[server]", err);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`serving ${ROOT} on http://${HOST}:${PORT}`);
});

// Railway sends SIGTERM on redeploy; exit cleanly so it does not look like a crash.
for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => server.close(() => process.exit(0)));
}
