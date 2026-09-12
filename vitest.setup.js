import "@testing-library/jest-dom/vitest";

// jsdom implements neither of these, and both are called during navigation.
window.scrollTo = () => {};
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
