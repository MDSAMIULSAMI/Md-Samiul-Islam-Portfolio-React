import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

// Root by default, which is what Vercel, Netlify and a custom domain all serve
// from. GitHub Pages serves this repo from a project subpath instead, so the
// `deploy` script sets VITE_BASE=/samiuls-portfolio-react/ for that build only.
const BASE = process.env.VITE_BASE || "/";

/**
 * GitHub Pages has no SPA rewrite, so it answers unknown paths with 404.html.
 * Shipping a copy of index.html there makes deep links and refreshes work.
 * Vercel uses the rewrite in vercel.json instead and never reaches this file.
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

export default defineConfig(({ command }) => ({
  base: command === "build" ? BASE : "/",
  plugins: [react(), tailwindcss(), spaFallback()],
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
