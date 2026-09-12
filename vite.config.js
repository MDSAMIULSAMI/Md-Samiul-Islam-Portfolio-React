import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

// GitHub Pages serves this repo from a project subpath. Change to "/" if you
// move the site to a custom domain or a <user>.github.io repo.
const BASE = process.env.VITE_BASE ?? "/samiuls-portfolio-react/";

/**
 * GitHub Pages has no SPA rewrite, so it answers unknown paths with 404.html.
 * Shipping a copy of index.html there makes deep links and refreshes work.
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
