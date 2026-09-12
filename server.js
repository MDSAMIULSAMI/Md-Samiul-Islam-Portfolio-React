/**
 * Production static server for the built SPA.
 *
 * Railway (and any container host) runs a long lived process and routes traffic
 * to $PORT, so `vite` and `vite preview` are not an option: the dev server
 * ignores $PORT and binds to localhost, which fails the health check and puts
 * the container in a restart loop.
 *
 * Zero dependencies on purpose, so the free tier footprint stays small.
 */
import { createReadStream, promises as fs } from "node:fs";
import { createServer } from "node:http";
import { createGzip } from "node:zlib";
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
  ".map": "application/json; charset=utf-8",
};

const COMPRESSIBLE = new Set([
  ".html", ".js", ".mjs", ".css", ".json", ".svg", ".txt", ".map", ".webmanifest",
]);

/** Resolve a URL path to a file inside ROOT, or null if it escapes or is missing. */
async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const target = resolve(join(ROOT, normalize(decoded)));
  if (target !== ROOT && !target.startsWith(ROOT + sep)) return null; // traversal
  try {
    const stat = await fs.stat(target);
    return stat.isFile() ? target : null;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { Allow: "GET, HEAD" }).end("Method Not Allowed");
      return;
    }

    const urlPath = req.url === "/" ? "/index.html" : req.url;
    // Static file first, then fall back to the SPA shell so client side routes
    // such as /experience survive a direct hit or a refresh.
    const file = (await resolveFile(urlPath)) ?? (await resolveFile("/index.html"));

    if (!file) {
      res.writeHead(500, { "Content-Type": "text/plain" }).end("Build output missing");
      return;
    }

    const ext = extname(file).toLowerCase();
    const isShell = file.endsWith(`${sep}index.html`);
    const headers = {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      // Hashed filenames can be cached forever; the shell never can.
      "Cache-Control": isShell
        ? "no-cache"
        : "public, max-age=31536000, immutable",
    };

    const wantsGzip = /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
    const gzip = wantsGzip && COMPRESSIBLE.has(ext);
    if (gzip) {
      headers["Content-Encoding"] = "gzip";
      headers["Vary"] = "Accept-Encoding";
    }

    res.writeHead(200, headers);

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    const stream = createReadStream(file);
    await (gzip ? pipeline(stream, createGzip(), res) : pipeline(stream, res));
  } catch (err) {
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
