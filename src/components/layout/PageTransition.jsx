import { useEffect } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";

/**
 * Wraps each route so AnimatePresence can cross fade between them.
 * Scroll is reset on enter rather than in a separate effect, which keeps the
 * jump hidden underneath the fade instead of happening mid animation.
 */
function PageTransition({ children }) {
  const lenis = useLenis();

  useEffect(() => {
    // Lenis tracks its own scroll value, so resetting through it rather than
    // through `window` also drops whatever momentum the outgoing page still
    // had. `immediate` skips the easing so the jump stays under the fade, and
    // `force` lets it through even while the scroller is stopped.
    // `lenis` is undefined for the first render of the first route, since a
    // child's effect runs before its provider's; the native call covers that.
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [lenis]);

  return (
    <motion.main
      className="flex-1"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;
