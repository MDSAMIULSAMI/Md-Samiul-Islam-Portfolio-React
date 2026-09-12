<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Sora&weight=700&size=34&pause=1000&color=7C5CFF&center=true&vCenter=true&width=620&lines=Md.+Samiul+Islam's+Portfolio;Software+Engineer;AI+Application+Developer" alt="Typing SVG" />
</h1>

<p align="center">
  <a href="https://github.com/MDSAMIULSAMI"><img src="https://img.shields.io/badge/GitHub-MDSAMIULSAMI-7c5cff?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://www.linkedin.com/in/samiulislamsamii"><img src="https://img.shields.io/badge/LinkedIn-Samiul%20Islam-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:mdsamiulislam2172@gmail.com"><img src="https://img.shields.io/badge/Email-mdsamiulislam2172-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Motion-13-000000?style=flat-square" />
</p>

---

## About

A personal portfolio built with React 19, Vite and Tailwind CSS 4. The design is
deliberately flat: solid colours, no gradients, a full bleed layout that runs edge
to edge, and fluid page transitions between routes.

All resume derived content lives in one module, [`src/data/profile.js`](src/data/profile.js),
so updating the CV means editing a single file.

## Tech stack

| Category | Technology |
|----------|-----------|
| **Build** | Vite 8, `@vitejs/plugin-react` |
| **UI** | React 19, React Router 7 |
| **Styling** | Tailwind CSS 4 (`@tailwindcss/vite`), design tokens via `@theme` |
| **Icons** | `lucide-react` for UI icons, inline SVG for the five social brand marks |
| **Motion** | `motion` for page transitions, scroll reveals and the animated nav pill |
| **Fonts** | Sora, Inter, JetBrains Mono, self hosted via `@fontsource-variable` |
| **PDF** | `react-pdf` 11, lazy loaded so pdf.js stays out of the main bundle |
| **Testing** | Vitest, Testing Library, jsdom |
| **Deploy** | GitHub Pages via `gh-pages` |

## Project structure

```
sami-portfolio/
├── index.html                  # Vite entry document
├── vite.config.js              # base path, Tailwind, SPA 404 fallback
├── vercel.json                 # SPA rewrites and asset caching for Vercel
├── railway.json                # build and start commands for Railway
├── nixpacks.toml               # keeps devDependencies during Railway's install
├── server.js                   # dependency free static server for container hosts
├── public/                     # favicon, manifest, robots
└── src/
    ├── main.jsx
    ├── App.jsx                 # router + AnimatePresence page transitions
    ├── index.css               # Tailwind import and @theme design tokens
    ├── data/profile.js         # single source of truth for all content
    ├── Assets/
    │   ├── media/              # project, paper and certificate images
    │   ├── portrait.jpg
    │   └── Resume/
    ├── components/
    │   ├── layout/             # Navbar, Footer, PageTransition
    │   └── ui/                 # Button, Card, Reveal, SectionHead,
    │                           # ProjectCard, SocialRow, LegalPage, BrandIcons
    └── pages/                  # Home, About, Experience, Projects,
                                # Achievements, Resume, PrivacyPolicy, TermsOfService
```

## Getting started

```bash
npm install          # Node 20.19+ / 22.12+ recommended
npm run dev          # http://localhost:5173
npm run build        # outputs to dist/, served from the root path
npm run preview      # preview the production build
npm start            # serve dist/ the way a container host does (build first)
npm test             # run the Vitest suite
npm run deploy       # build for the gh-pages subpath and publish
```

> The install may need `--legacy-peer-deps` on npm 10.9, which trips over
> Vitest's optional peer set. `npm ci` is unaffected.

### Deploying

The base path is the only thing that differs between hosts, and it is driven by
the `VITE_BASE` environment variable. The router reads the same value back
through `import.meta.env.BASE_URL`.

| Host | Command | Base | SPA routing |
|------|---------|------|-------------|
| **Vercel / Netlify / custom domain** | `npm run build` (run automatically) | `/` | `vercel.json` rewrites everything to `/index.html` |
| **Railway** (or any container host) | `npm run build`, then `node server.js` | `/` | `server.js` falls back to `index.html` |
| **GitHub Pages** (project subpath) | `npm run deploy` | `/samiuls-portfolio-react/` | a `404.html` copy of `index.html` is emitted on build |

Vercel and Railway both need no setup beyond the committed `vercel.json` and
`railway.json` / `nixpacks.toml`. Do not set `VITE_BASE` on either, the default
`/` is correct. For a different GitHub Pages repo name, change `build:ghpages`
in `package.json`.

### Running on Railway

This is a static build, so the container needs a real HTTP server rather than
Vite. `server.js` is a dependency free static server that:

- listens on `$PORT` and binds `0.0.0.0`, which the health check requires
- serves `dist/` and falls back to `index.html` for client side routes
- gzips text responses (the main bundle drops from 487 kB to 155 kB)
- marks hashed assets `immutable` and the HTML shell `no-cache`
- exits cleanly on `SIGTERM` so a redeploy is not logged as a crash

Two things bite on Railway and both are handled in the repo:

1. `npm start` must not be `vite`. The dev server ignores `$PORT` and binds to
   localhost, so the health check never passes and the container restart loops.
   `start` is `node server.js`.
2. Railway sets `NODE_ENV=production`, and `npm ci` then skips
   devDependencies, so `vite` goes missing and the build fails with
   `vite: not found`. `nixpacks.toml` pins the install to
   `npm ci --include=dev`.

Railway's free tier is fine for this, but a static host such as Vercel, Netlify
or GitHub Pages is a better fit for a site with no backend.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero, stats, introduction, featured work and contact CTA |
| **About** | `/about` | Bio, at a glance card, grouped skills, GitHub contribution graph |
| **Experience** | `/experience` | Career timeline, education and publications |
| **Projects** | `/projects` | Filterable project grid (All, AI & ML, Full Stack, Research) |
| **Achievements** | `/achievements` | Research papers and course certifications |
| **Resume** | `/resume` | Embedded PDF viewer with responsive page fitting |
| **Legal** | `/privacy-policy`, `/terms-of-service` | Privacy policy and terms |

## Design notes

- **Solid colour system.** Every surface, border and accent is a flat token
  defined in `@theme`. No gradients anywhere.
- **Full bleed layout.** The `.bleed` utility applies a small safety gutter and
  nothing else, so content runs the full width of the viewport.
- **Fluid route transitions.** `AnimatePresence mode="wait"` fades the outgoing
  page out before the incoming one fades in, and the active nav pill animates
  between items with a shared `layoutId`.
- **Round portrait.** The hero avatar is a circle with a location badge pinned
  to its lower edge.
- **Responsive from 320px.** Verified for zero horizontal overflow on every
  route at 320, 390, 768, 1024 and 1920 px.
- **Reduced motion aware.** `MotionConfig reducedMotion="user"` disables motion
  for anyone who asks the OS for it.
- **Almost no third party requests.** Fonts and every project, paper and
  certificate image are bundled locally, so ad blockers and privacy extensions
  have nothing to block (`ERR_BLOCKED_BY_CLIENT`). The only outbound request is
  the GitHub contribution graph API, and that section degrades to a message plus
  a link to the profile when it cannot load.
- **Blocker safe module names.** Vite's dev server serves modules at their real
  path, so a file named `PrivacyPolicy.jsx` is fetched from
  `/src/pages/PrivacyPolicy.jsx` and matches the generic `/privacypolicy.js`
  rule in Fanboy's Annoyances, which ships with uBlock Origin and AdGuard. That
  blocks the module and leaves the dev app blank. The legal pages are therefore
  named `LegalPrivacy.jsx` and `LegalTerms.jsx`; the public routes are still
  `/privacy-policy` and `/terms-of-service`. Keep new filenames clear of words
  like `ads`, `analytics` and `tracking` for the same reason.

## Contact

- **Email:** mdsamiulislam2172@gmail.com
- **GitHub:** [MDSAMIULSAMI](https://github.com/MDSAMIULSAMI)
- **LinkedIn:** [Samiul Islam](https://www.linkedin.com/in/samiulislamsamii)
- **Codeforces:** [Md_Samiul_Islam](https://codeforces.com/profile/Md_Samiul_Islam)
- **LeetCode:** [mdsamiulislam2172](https://leetcode.com/u/mdsamiulislam2172)

---

<p align="center">Designed and built by <strong>Md. Samiul Islam</strong></p>
