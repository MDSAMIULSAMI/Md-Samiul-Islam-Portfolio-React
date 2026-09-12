import "@testing-library/jest-dom/vitest";

// jsdom implements none of these, and all of them are called during
// navigation or by the smooth scroller as it measures the document and reads
// the user's motion preference.
window.scrollTo = () => {};
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent: () => false,
});
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
