import { motion } from "motion/react";

/**
 * Fades a block up as it scrolls into view. Honours reduced motion because
 * motion's `useReducedMotion` is applied through the global MotionConfig.
 */
function Reveal({ children, delay = 0, y = 20, className, as = "div" }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
