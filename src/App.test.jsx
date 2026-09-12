import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App.jsx";
import { profile } from "./data/profile.js";
import { PAGE_SEO, absoluteUrl } from "./data/seo.js";

describe("App", () => {
  test("renders the hero with the profile name", async () => {
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent(profile.name);
  });

  test("renders the primary navigation", () => {
    render(<App />);
    ["Home", "About", "Experience", "Projects", "Awards", "Resume"].forEach((label) => {
      expect(screen.getAllByRole("link", { name: new RegExp(`^${label}$`) }).length).toBeGreaterThan(0);
    });
  });
});

describe("head metadata", () => {
  // index.html ships the defaults for scrapers that never run this code, and
  // the build prerenders a copy per route. This covers the third path: the
  // client updating those same tags as the user navigates.
  test("the active route's title, description and canonical reach the document", async () => {
    window.history.pushState({}, "", "/experience");
    render(<App />);

    const page = PAGE_SEO["/experience"];
    await waitFor(() => expect(document.title).toBe(page.title));
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      page.description
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      absoluteUrl("/experience")
    );
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      "content",
      page.title
    );
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "index, follow"
    );
  });
});
