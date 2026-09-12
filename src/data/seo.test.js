import { describe, expect, test } from "vitest";
import { IDENTITY, PAGE_SEO, absoluteUrl, indexablePaths, seoFor, structuredData } from "./seo.js";
import { education, profile, socials } from "./profile.js";
import { PAGES } from "../App.jsx";

describe("page metadata", () => {
  test("every route has its own entry, and every entry is a route", () => {
    const routes = PAGES.map((page) => page.path).sort();
    expect(Object.keys(PAGE_SEO).sort()).toEqual(routes);
  });

  test("titles and descriptions are unique, so no two pages compete", () => {
    const titles = Object.values(PAGE_SEO).map((page) => page.title);
    const descriptions = Object.values(PAGE_SEO).map((page) => page.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  test("descriptions fit the search snippet", () => {
    for (const [path, page] of Object.entries(PAGE_SEO)) {
      // Under ~70 characters wastes the slot, over ~160 gets truncated.
      expect(page.description.length, path).toBeGreaterThan(70);
      expect(page.description.length, path).toBeLessThanOrEqual(160);
      expect(page.title.length, path).toBeLessThanOrEqual(60);
    }
  });

  test("sitemap rows carry the fields the schema requires", () => {
    for (const path of indexablePaths) {
      const { priority, changeFrequency } = PAGE_SEO[path];
      expect(priority, path).toBeGreaterThan(0);
      expect(priority, path).toBeLessThanOrEqual(1);
      expect(changeFrequency, path).toMatch(/^(always|hourly|daily|weekly|monthly|yearly|never)$/);
    }
  });

  test("unknown paths fall back to site level copy rather than an empty head", () => {
    expect(seoFor("/not-a-route").title).toBeTruthy();
    expect(seoFor("/not-a-route").description).toBeTruthy();
  });

  test("absoluteUrl builds one clean absolute URL per route", () => {
    for (const path of indexablePaths) {
      const url = absoluteUrl(path);
      expect(url).toMatch(/^https?:\/\//);
      expect(url.replace(/^https?:\/\//, "")).not.toContain("//");
    }
  });
});

describe("structured data", () => {
  // IDENTITY is copied out of profile.js because vite.config.js has to read it
  // under plain Node, which cannot load the .jpg imports profile.js carries.
  // These keep the copy honest.
  test("mirrors profile.js", () => {
    expect(IDENTITY.name).toBe(profile.name);
    expect(IDENTITY.jobTitle).toBe(profile.role);
    expect(IDENTITY.email).toBe(profile.email);
    expect(profile.location).toBe(`${IDENTITY.locality}, ${IDENTITY.country}`);
    expect(IDENTITY.alumniOf).toBe(education.school);
    expect(IDENTITY.sameAs).toContain(socials.github);
    expect(IDENTITY.sameAs).toContain(socials.linkedin);
  });

  test("emits a linked Person, WebSite and ProfilePage graph", () => {
    const data = structuredData("https://example.com");
    const types = data["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(["Person", "WebSite", "ProfilePage"]);

    const [person, website, page] = data["@graph"];
    expect(person["@id"]).toBe("https://example.com/#person");
    expect(website.publisher["@id"]).toBe(person["@id"]);
    expect(page.about["@id"]).toBe(person["@id"]);
    expect(page.isPartOf["@id"]).toBe(website["@id"]);
    expect(person.image).toMatch(/^https:\/\/example\.com\//);
  });
});
