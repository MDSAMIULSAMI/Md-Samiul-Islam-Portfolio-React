/**
 * Every piece of per page metadata the site emits, in one place.
 *
 * This module is imported by the running app *and* by vite.config.js, which
 * bakes the same values into a prerendered <head> per route and into
 * sitemap.xml. Keep it free of JSX, images and browser globals so Node can
 * load it during the build.
 */

// Resolved at build time by vite.config.js. Declared here as a fallback so the
// module stays usable under plain Node (the sitemap plugin imports it before
// the define kicks in) and in any test that renders without the define.
const BUILD_SITE_URL =
  typeof __SITE_URL__ === "string" ? __SITE_URL__ : "http://localhost:5173";

export const SITE = {
  url: BUILD_SITE_URL.replace(/\/+$/, ""),
  name: "Md. Samiul Islam",
  title: "Md. Samiul Islam | Software Engineer",
  description:
    "Md. Samiul Islam is a software engineer in Dhaka building FastAPI backends, React frontends and LLM powered product features used by 34,000+ people.",
  locale: "en_US",
  lang: "en",
  twitter: "summary_large_image",
  // 1200x630 so the large card renders without the platforms cropping it.
  image: "/og-cover.png",
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: "Md. Samiul Islam, Software Engineer building FastAPI backends, React frontends and LLM powered features.",
};

/**
 * Keyed by route path so the router, the prerenderer and the sitemap all read
 * the same row and cannot drift apart.
 *
 * `title` is the full <title>; descriptions are kept near 155 characters,
 * which is roughly where Google truncates the snippet. `priority` and
 * `changeFrequency` feed sitemap.xml. `noindex` keeps thin or duplicate pages
 * out of the index while still letting crawlers follow their links.
 */
export const PAGE_SEO = {
  "/": {
    title: "Md. Samiul Islam | Software Engineer in Dhaka",
    description:
      "Software engineer building FastAPI backends, React frontends and LLM powered product features. Selected work, research and a resume you can download.",
    priority: 1.0,
    changeFrequency: "monthly",
  },
  "/about": {
    title: "About | Md. Samiul Islam",
    description:
      "Who I am and what I work with: Python, FastAPI, React, Next.js, LangChain and RAG pipelines, plus the tools I reach for day to day.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  "/experience": {
    title: "Experience | Md. Samiul Islam",
    description:
      "Three engineering teams, one throughline: own the feature end to end and make sure it holds up in production. Roles at Travela, DataCrata and CoderOrbit.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  "/projects": {
    title: "Projects | Md. Samiul Islam",
    description:
      "Products, research prototypes and side projects, from agentic services in production to transformer architectures written for a peer reviewed paper.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  "/achievements": {
    title: "Achievements | Md. Samiul Islam",
    description:
      "Peer reviewed publications on Bangla sentiment analysis, academic honours and the certifications that shaped how I work.",
    priority: 0.7,
    changeFrequency: "yearly",
  },
  "/resume": {
    title: "Resume | Md. Samiul Islam",
    description:
      "The one page version: experience, projects, skills and publications. Read it in the browser or download the PDF.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Md. Samiul Islam",
    description:
      "What this site collects, what it does not, and how to get in touch about it.",
    priority: 0.2,
    changeFrequency: "yearly",
  },
  "/terms-of-service": {
    title: "Terms of Service | Md. Samiul Islam",
    description:
      "The terms that apply to using this site and the content published on it.",
    priority: 0.2,
    changeFrequency: "yearly",
  },
};

/** Absolute URL for a route path, which canonical and og:url both require. */
export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`.replace(
    /(?<!:)\/{2,}/g,
    "/"
  );
}

/** The row for a route, falling back to site level copy for unknown paths. */
export function seoFor(path) {
  return PAGE_SEO[path] ?? { title: SITE.title, description: SITE.description };
}

/**
 * The identity facts schema.org cares about.
 *
 * These are duplicated from src/data/profile.js rather than imported: that
 * module pulls in .jpg files, which Node cannot load, and vite.config.js has
 * to read this one during the build. src/data/seo.test.js asserts the two
 * agree, so the copy cannot quietly drift.
 */
export const IDENTITY = {
  name: "Md. Samiul Islam",
  jobTitle: "Software Engineer",
  email: "mdsamiulislam2172@gmail.com",
  locality: "Dhaka",
  country: "Bangladesh",
  alumniOf: "Green University of Bangladesh",
  worksFor: "Expert Travel and Tourism Ltd.",
  sameAs: [
    "https://github.com/MDSAMIULSAMI",
    "https://www.linkedin.com/in/samiulislamsamii",
    "https://codeforces.com/profile/Md_Samiul_Islam",
    "https://leetcode.com/u/mdsamiulislam2172",
  ],
  knowsAbout: [
    "Software Engineering",
    "Backend Development",
    "FastAPI",
    "Python",
    "React",
    "JavaScript",
    "Large Language Models",
    "Retrieval Augmented Generation",
    "Natural Language Processing",
    "System Design",
  ],
};

/**
 * JSON-LD for the site, as a single @graph so the Person and the WebSite can
 * reference each other by @id instead of being repeated. Emitted into the
 * static <head> at build time, because a crawler that reads it without
 * executing JavaScript is the whole point of having it.
 */
export function structuredData(siteUrl = SITE.url) {
  const origin = siteUrl.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${origin}/#person`,
        name: IDENTITY.name,
        url: `${origin}/`,
        image: `${origin}${SITE.image}`,
        jobTitle: IDENTITY.jobTitle,
        email: `mailto:${IDENTITY.email}`,
        description: SITE.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: IDENTITY.locality,
          addressCountry: IDENTITY.country,
        },
        alumniOf: { "@type": "CollegeOrUniversity", name: IDENTITY.alumniOf },
        worksFor: { "@type": "Organization", name: IDENTITY.worksFor },
        knowsAbout: IDENTITY.knowsAbout,
        sameAs: IDENTITY.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: SITE.name,
        description: SITE.description,
        inLanguage: SITE.lang,
        publisher: { "@id": `${origin}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${origin}/#webpage`,
        url: `${origin}/`,
        name: SITE.title,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#person` },
        inLanguage: SITE.lang,
      },
    ],
  };
}

/** Routes that belong in sitemap.xml, in the order they appear above. */
export const indexablePaths = Object.entries(PAGE_SEO)
  .filter(([, page]) => !page.noindex)
  .map(([path]) => path);
