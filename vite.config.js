import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { PAGE_SEO, indexablePaths, structuredData } from "./src/data/seo.js";

// Root by default, which is what Cloudflare serves from. GitHub Pages serves
// this repo from a project subpath instead, so the `deploy` script sets
// VITE_BASE=/samiuls-portfolio-react/ for that build only.
const BASE = process.env.VITE_BASE || "/";

/** The custom domain, and so the origin every production build points at. */
const PRODUCTION_URL = "https://mdsamiulislam.com";

/**
 * Absolute origin this build will be published under. Canonical tags, og:url
 * and sitemap.xml are all meaningless without it, and pointing them at the
 * wrong host is worse than omitting them, so it is resolved, never guessed:
 *
 *   1. VITE_SITE_URL, to point a build at any other host.
 *   2. The GitHub Pages project URL, but only for the build that targets it.
 *   3. PRODUCTION_URL for every other build. Cloudflare injects nothing that
 *      names the custom domain, and falling through to the dev server here
 *      would ship a sitemap and canonical tags that all say localhost.
 *   4. The dev server, which keeps `npm run dev` self consistent.
 */
function resolveSiteUrl(command) {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.replace(/\/+$/, "");
  if (BASE !== "/") return `https://mdsamiulsami.github.io${BASE}`.replace(/\/+$/, "");
  if (command === "build") return PRODUCTION_URL;
  return "http://localhost:5173";
}

// Only the config function below knows whether this is a build or the dev
// server, so it assigns this. Every plugin reads it inside a hook, which Vite
// runs after that.
let SITE_URL;

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
 * Cloudflare and GitHub Pages both answer unknown paths with 404.html, so a
 * copy of index.html there lets the app redirect old or mistyped links, while
 * the 404 status keeps those URLs out of search results.
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
 * This writes a copy of the shell per route to dist/<route>.html with that
 * route's tags already substituted. React then takes over on the client and
 * the two agree, because both read src/data/seo.js.
 *
 * A flat <route>.html rather than <route>/index.html, because Cloudflare only
 * serves a directory index at the trailing slash URL: /about would answer with
 * a redirect to /about/, and Search Console reports every sitemap URL that
 * redirects as "Page with redirect" instead of indexing it. Cloudflare and
 * GitHub Pages both serve a flat file at /about as it is.
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

        const file = resolve(out, `.${path}.html`);
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

export default defineConfig(({ command }) => {
  SITE_URL = resolveSiteUrl(command);

  return {
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
  };
});
