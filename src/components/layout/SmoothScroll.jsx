import { ReactLenis } from "lenis/react";

/**
 * Momentum scrolling for the whole page.
 *
 * Lenis intercepts wheel input and eases `window.scrollTo` on its own rAF
 * loop, so the document genuinely scrolls: native scroll events, the
 * IntersectionObserver reveals and `position: fixed` on the navbar all keep
 * working, unlike transform based fake scrollers that move a wrapper instead.
 *
 * Hoisted to a module constant because ReactLenis tears down and rebuilds the
 * instance whenever the serialised form of `options` changes, and an inline
 * object literal is a new value on every render.
 */
const OPTIONS = {
  // Fraction of the remaining distance covered each frame, normalised for
  // frame rate. Lower glides for longer; the stock 0.1 still reads a little
  // abrupt on these long pages.
  lerp: 0.085,
  smoothWheel: true,
  // Phones already have real momentum scrolling from the OS. `syncTouch`
  // replaces it with a simulation that fights the platform and feels heavy,
  // so touch is left alone and only wheel/trackpad input is smoothed.
  syncTouch: false,
  // In page `#hash` links ease to their target instead of jumping.
  anchors: true,
  // Anything with its own overflow (the resume viewer's horizontal pane)
  // scrolls natively while the pointer is over it.
  allowNestedScroll: true,
  // Clicking a nav link while the page is still gliding kills the leftover
  // momentum, so it cannot bleed into the route that is fading in.
  stopInertiaOnNavigate: true,
  autoRaf: true,
  // Default, restated because it is the reason there is no manual
  // prefers-reduced-motion branch here: Lenis drops to 1:1 tracking and makes
  // programmatic scrolls instant on its own.
  respectReducedMotion: true,
};

function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={OPTIONS}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
