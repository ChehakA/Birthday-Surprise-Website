import { useEffect } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "motion/react";

/**
 * Thin bar at the top of the screen. It fills as he scrolls, scaled by how
 * many chapters are unlocked, so it only reaches the end at the very end.
 */
export function ScrollProgress({ unlocked, total }: { unlocked: number; total: number }) {
  const { scrollYProgress } = useScroll();
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const fraction = Math.min(1, unlocked / total);
    const update = (v: number) => progress.set(v * fraction);
    update(scrollYProgress.get());
    return scrollYProgress.on("change", update);
  }, [scrollYProgress, progress, unlocked, total]);

  return (
    <div className="progress" aria-hidden="true">
      <motion.div className="progress__bar" style={{ scaleX: smooth }} />
    </div>
  );
}
