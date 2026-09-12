import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { PAGE_SEO, indexablePaths, structuredData } from "./src/data/seo.js";

// Root by default, which is what Railway and a custom domain serve from.
// GitHub Pages serves this repo from a project subpath instead, so the
// `deploy` script sets VITE_BASE=/samiuls-portfolio-react/ for that build only.
const BASE = process.env.VITE_BASE || "/";

/**
 * Absolute origin this build will be published under. Canonical tags, og:url
 * and sitemap.xml are all meaningless without it, and pointing them at the
 * wrong host is worse than omitting them, so it is resolved, never guessed:
 *
 *   1. VITE_SITE_URL, for a custom domain or any host not covered below.
 *   2. RAILWAY_PUBLIC_DOMAIN, which Railway injects into the build environment
 *      itself, so a Railway deploy needs no configuration at all.
 *   3. The GitHub Pages project URL, but only for the build that targets it.
 *   4. The dev server, which keeps `npm run dev` self consistent.
 */
function resolveSiteUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.replace(/\/+$/, "");
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  if (BASE !== "/") return `https://mdsamiulsami.github.io${BASE}`.replace(/\/+$/, "");
  return "http://localhost:5173";
}

const SITE_URL = resolveSiteUrl();

/** Join the deploy origin (which may carry a subpath) with a route path. */
const urlFor = (path) => `${SITE_URL}${path === "/" ? "/" : path}`;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * The head tags that differ per route, as the patterns that find them in the
 * built shell. Each must expose the text before and after the value as groups
 * 1 and 2, so it can be swapped without reparsing the HTML.
 */
const HEAD_PATTERNS = {
  description: /(<meta name="description" content=")[^"]*(")/,
  canonical: /(<link rel="canonical" href=")[^"]*(")/,
  ogTitle: /(<meta property="og:title" content=")[^"]*(")/,
  ogDescription: /(<meta property="og:description" content=")[^"]*(")/,
  ogUrl: /(<meta property="og:url" content=")[^"]*(")/,
  twitterTitle: /(<meta name="twitter:title" content=")[^"]*(")/,
  twitterDescription: /(<meta name="twitter:description" content=")[^"]*(")/,
  robots: /(<meta name="robots" content=")[^"]*(")/,
};

/**
 * Swap one tag's value. Throws rather than returning the input unchanged: a
 * pattern that stops matching, because index.html was reformatted, would
 * otherwise ship every route with the home page's title and share card, and
 * nothing about the build would look wrong.
 */
function setTag(html, name, value) {
  const pattern = HEAD_PATTERNS[name];
  if (!pattern.test(html)) {
    throw new Error(
      `[seo] no <head> tag matched "${name}" (${pattern}). index.html was ` +
        `reformatted; update HEAD_PATTERNS in vite.config.js to match.`
    );
  }
  return html.replace(pattern, (_m, before, after) => `${before}${escapeHtml(value)}${after}`);
}

/**
 * Substitutes %SITE_URL% in index.html and appends the site's JSON-LD.
 *
 * Both need the absolute origin, which is only known here, and both have to
 * land in the static HTML rather than be added by React: the crawlers that
 * read structured data and share cards are exactly the ones that do not run
 * the JavaScript that would create them.
 */
function seoHead() {
  return {
    name: "seo-head",
    transformIndexHtml(html) {
      const jsonLd = JSON.stringify(structuredData(SITE_URL));
      return html
        .replaceAll("%SITE_URL%", SITE_URL)
        .replace(
          "</head>",
          `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`
        );
    },
  };
}

/**
 * GitHub Pages has no SPA rewrite, so it answers unknown paths with 404.html.
 * Shipping a copy of index.html there makes deep links and refreshes work.
 * On Railway, server.js handles the fallback and this file is unused.
 */
function spaFallback() {
  return {
    name: "spa-404-fallback",
    closeBundle() {
      const out = resolve(process.cwd(), "dist");
      copyFileSync(resolve(out, "index.html"), resolve(out, "404.html"));
    },
  };
}

/**
 * Search engines and social scrapers read <head> straight out of the HTML
 * response. A single page app only ships one, so every route would otherwise
 * advertise the home page's title, description and share card.
 *
 * This writes a copy of the shell per route to dist/<route>/index.html with
 * that route's tags already substituted. React then takes over on the client
 * and the two agree, because both read src/data/seo.js.
 */
function prerenderHeads() {
  return {
    name: "seo-prerender-heads",
    closeBundle() {
      const out = resolve(process.cwd(), "dist");
      const shell = readFileSync(resolve(out, "index.html"), "utf8");

      for (const [path, page] of Object.entries(PAGE_SEO)) {
        if (path === "/") continue; // that is the shell itself
        const { title, description, noindex } = page;
        const url = urlFor(path);

        let html = shell.replace(
          /<title>[\s\S]*?<\/title>/,
          () => `<title>${escapeHtml(title)}</title>`
        );
        html = setTag(html, "description", description);
        html = setTag(html, "canonical", url);
        html = setTag(html, "ogTitle", title);
        html = setTag(html, "ogDescription", description);
        html = setTag(html, "ogUrl", url);
        html = setTag(html, "twitterTitle", title);
        html = setTag(html, "twitterDescription", description);
        html = setTag(html, "robots", noindex ? "noindex, follow" : "index, follow");

        const file = resolve(out, `.${path}/index.html`);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html);
      }
    },
  };
}

/**
 * sitemap.xml and robots.txt, generated rather than committed because both
 * need the absolute origin, which differs per deploy target.
 */
function seoFiles() {
  return {
    name: "seo-sitemap-robots",
    closeBundle() {
      const out = resolve(process.cwd(), "dist");
      const today = new Date().toISOString().slice(0, 10);

      const urls = indexablePaths
        .map((path) => {
          const { priority, changeFrequency } = PAGE_SEO[path];
          return [
            "  <url>",
            `    <loc>${urlFor(path)}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            `    <changefreq>${changeFrequency}</changefreq>`,
            `    <priority>${priority.toFixed(1)}</priority>`,
            "  </url>",
          ].join("\n");
        })
        .join("\n");

      writeFileSync(
        resolve(out, "sitemap.xml"),
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `${urls}\n</urlset>\n`
      );

      writeFileSync(
        resolve(out, "robots.txt"),
        [
          "# https://www.robotstxt.org/robotstxt.html",
          "User-agent: *",
          "Allow: /",
          "",
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          "",
        ].join("\n")
      );
    },
  };
}

/**
 * Writes a .br and a .gz beside every compressible build artefact.
 *
 * server.js serves those bytes straight off disk. Compressing per request
 * instead cost about 18ms of CPU on the main bundle and held four cores at
 * roughly 250 req/s, which is a small container's entire capacity spent
 * recomputing an answer that never changes. Doing it here happens once, and
 * affords the slowest and smallest settings a request handler could never
 * justify, which is also what makes brotli worth offering at all.
 *
 * Must run last: prerenderHeads and seoFiles write files of their own in
 * closeBundle, and those need compressing too. Every hook here is synchronous,
 * so plugin order is enough to guarantee it.
 */
function precompress() {
  // Kept in step with COMPRESSIBLE in server.js. Formats that arrive already
  // compressed, which is every image, font and the PDF, only grow.
  const EXTENSIONS = new Set([
    ".html", ".js", ".mjs", ".css", ".json", ".svg", ".txt", ".xml", ".map", ".webmanifest",
  ]);
  // Under about a kilobyte the saving is a rounding error and a gzip header can
  // make the file bigger, so those are left as they are.
  const MIN_BYTES = 1024;

  return {
    name: "precompress-assets",
    // vitest loads this config too, and its teardown fires closeBundle as
    // well, which would recompress dist on every test run.
    apply: "build",
    closeBundle() {
      let count = 0;
      let before = 0;
      let after = 0;

      const walk = (dir) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
          const path = join(dir, entry.name);
          if (entry.isDirectory()) {
            walk(path);
            continue;
          }
          if (!EXTENSIONS.has(extname(entry.name).toLowerCase())) continue;

          const raw = readFileSync(path);
          if (raw.length < MIN_BYTES) continue;

          const br = brotliCompressSync(raw, {
            params: {
              [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
              [constants.BROTLI_PARAM_SIZE_HINT]: raw.length,
            },
          });
          writeFileSync(`${path}.br`, br);
          writeFileSync(`${path}.gz`, gzipSync(raw, { level: 9 }));

          count += 1;
          before += raw.length;
          after += br.length;
        }
      };

      walk(resolve(process.cwd(), "dist"));

      const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`;
      console.log(
        `\n\x1b[32m✓\x1b[0m precompressed ${count} files: ` +
          `${kb(before)} → ${kb(after)} brotli ` +
          `(${(100 - (after / before) * 100).toFixed(0)}% smaller)`
      );
    },
  };
}

export default defineConfig(({ command }) => ({
  base: command === "build" ? BASE : "/",
  define: {
    // Read by src/data/seo.js, so the canonical and og:url React writes during
    // client side navigation match what the build baked into the static heads.
    __SITE_URL__: JSON.stringify(SITE_URL),
  },
  plugins: [
    react(),
    tailwindcss(),
    seoHead(),
    spaFallback(),
    prerenderHeads(),
    seoFiles(),
    precompress(),
  ],
  build: {
    outDir: "dist",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
    css: true,
  },
}));
