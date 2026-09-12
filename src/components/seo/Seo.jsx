import { useEffect } from "react";
import { SITE, absoluteUrl, seoFor } from "../../data/seo.js";

/**
 * Keeps <head> in step with the active route.
 *
 * The tags are *updated in place* rather than rendered as JSX. React 19 will
 * happily hoist a <title> or <meta> from anywhere in the tree, but it appends
 * rather than replaces, so the defaults already sitting in index.html would
 * survive alongside the new ones: two descriptions, two og:titles, and a
 * <title> where the browser keeps the first. index.html has to carry those
 * defaults, because social scrapers (Facebook, LinkedIn, Slack) never run the
 * JavaScript that would otherwise produce them, so mutation it is.
 */
function upsert(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    for (const [key, value] of Object.entries(attrs.identity)) el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  el.setAttribute(attrs.key, attrs.value);
}

function Seo({ path }) {
  const page = seoFor(path);
  const { title, description, noindex } = page;
  const url = absoluteUrl(path);

  useEffect(() => {
    document.title = title;

    upsert('meta[name="description"]', {
      identity: { name: "description" },
      key: "content",
      value: description,
    });

    // One canonical per route is what stops /projects and /project?ref=x from
    // being read as separate, competing pages.
    upsert('link[rel="canonical"]', {
      identity: { rel: "canonical" },
      key: "href",
      value: url,
    });

    for (const [property, value] of [
      ["og:title", title],
      ["og:description", description],
      ["og:url", url],
    ]) {
      upsert(`meta[property="${property}"]`, {
        identity: { property },
        key: "content",
        value,
      });
    }

    for (const [name, value] of [
      ["twitter:title", title],
      ["twitter:description", description],
    ]) {
      upsert(`meta[name="${name}"]`, {
        identity: { name },
        key: "content",
        value,
      });
    }

    // `follow` rather than a bare `noindex`: the page stays out of the index
    // but its outbound links still pass through to pages that belong there.
    upsert('meta[name="robots"]', {
      identity: { name: "robots" },
      key: "content",
      value: noindex ? "noindex, follow" : "index, follow",
    });
  }, [title, description, url, noindex]);

  return null;
}

export default Seo;
export { SITE };
