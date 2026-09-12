/**
 * Renders public/og-cover.png, the 1200x630 card that Facebook, LinkedIn,
 * X, Slack and friends show when the site is shared.
 *
 * The card is committed, so this only needs rerunning when the wording, the
 * portrait or the palette changes: `npm run og`. It draws with the site's own
 * fonts and tokens by inlining them as data URIs, then screenshots the page
 * with whichever Chromium build is already on the machine, which keeps a
 * headless browser out of devDependencies for a file that changes once a year.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "og-cover.png");

const BROWSERS = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const browser = BROWSERS.find((path) => existsSync(path));
if (!browser) {
  console.error(
    "No Chromium based browser found. Install one, or point CHROME_PATH at it."
  );
  process.exit(1);
}

const dataUri = (path, mime) =>
  `data:${mime};base64,${readFileSync(join(ROOT, path)).toString("base64")}`;

const sora = dataUri(
  "node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2",
  "font/woff2"
);
const inter = dataUri(
  "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  "font/woff2"
);
// Same photo the hero uses, see src/pages/Home.jsx.
const portrait = dataUri("src/Assets/SamGermany.jpg", "image/jpeg");

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: "Sora"; src: url(${sora}) format("woff2-variations"); font-weight: 100 800; }
@font-face { font-family: "Inter"; src: url(${inter}) format("woff2-variations"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body {
  background: #08080c; color: #d7d7e0; font-family: "Inter", system-ui, sans-serif;
  display: flex; align-items: center; gap: 64px; padding: 0 72px;
  -webkit-font-smoothing: antialiased;
}
.left { flex: 1; min-width: 0; }
.badge {
  display: inline-flex; align-items: center; gap: 10px; margin-bottom: 28px;
  padding: 8px 16px 8px 8px; border: 1px solid #272733; border-radius: 999px;
  background: #14141c; font-size: 19px; color: #9494a6;
}
.mark {
  width: 36px; height: 36px; border-radius: 10px; background: #7c5cff; color: #fff;
  font-family: "Sora"; font-weight: 800; font-size: 15px; display: grid; place-items: center;
}
h1 {
  font-family: "Sora"; font-weight: 700; font-size: 72px; line-height: 1.05;
  letter-spacing: -0.03em; color: #f5f5fa; margin-bottom: 20px;
}
.role { font-family: "Sora"; font-weight: 700; font-size: 34px; color: #7c5cff; letter-spacing: -0.02em; margin-bottom: 26px; }
.sub { font-size: 24px; line-height: 1.5; color: #9494a6; max-width: 15.5em; }
.rule { height: 1px; background: #272733; margin: 34px 0 26px; width: 100%; }
.stack { display: flex; flex-wrap: wrap; gap: 10px; }
.chip { padding: 7px 15px; border: 1px solid #272733; border-radius: 999px; background: #14141c; font-size: 19px; color: #d7d7e0; }
.right { flex: 0 0 340px; }
/* Within a percent of the source photo's 3:4, so object-fit has almost
   nothing to crop. A square frame here cut the face off at the edge. */
.photo { width: 340px; height: 445px; border-radius: 24px; object-fit: cover; object-position: center 30%; border: 1px solid #272733; }
</style></head><body>
  <div class="left">
    <div class="badge"><span class="mark">SI</span> Dhaka, Bangladesh</div>
    <h1>Md. Samiul Islam</h1>
    <div class="role">Software Engineer</div>
    <div class="sub">FastAPI backends, React frontends and LLM powered product features.</div>
    <div class="rule"></div>
    <div class="stack">
      <span class="chip">Python</span><span class="chip">FastAPI</span>
      <span class="chip">React</span><span class="chip">LangChain</span>
      <span class="chip">RAG</span>
    </div>
  </div>
  <div class="right"><img class="photo" src="${portrait}" alt=""></div>
</body></html>`;

const workdir = mkdtempSync(join(tmpdir(), "og-cover-"));
const page = join(workdir, "card.html");
writeFileSync(page, html);

execFileSync(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    `--screenshot=${OUT}`,
    // The fonts and the portrait are inline, but the layout still needs a
    // beat to settle before the shot is taken.
    "--virtual-time-budget=4000",
    `file://${page}`,
  ],
  { stdio: ["ignore", "ignore", "pipe"] }
);

console.log(`wrote ${OUT}`);
