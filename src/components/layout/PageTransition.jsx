import { useEffect } from "react";
import { motion } from "motion/react";

/**
 * Wraps each route so AnimatePresence can cross fade between them.
 * Scroll is reset on enter rather than in a separate effect, which keeps the
 * jump hidden underneath the fade instead of happening mid animation.
 */
function PageTransition({ children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

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
