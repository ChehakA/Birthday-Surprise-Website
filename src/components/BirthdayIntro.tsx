import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { birthdayContent as content } from "../data/birthdayContent";
import { prefersReducedMotion } from "../hooks/useArrive";
import { AnimatedEnvelope } from "./AnimatedEnvelope";
import { HeartBurst } from "./HeartBurst";

/** Full-screen opening scene. First tap opens the envelope, a second tap skips ahead. */
export function BirthdayIntro({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleTap = () => {
    if (opening) {
      // Already opening: don't make him wait for the animation.
      window.clearTimeout(timer.current);
      onOpen();
      return;
    }
    setOpening(true);
    timer.current = window.setTimeout(onOpen, prefersReducedMotion() ? 700 : 2300);
  };

  return (
    <motion.section
      className="intro"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="intro__glow" aria-hidden="true" />
      <motion.p
        className="intro__greeting"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {content.intro.greeting}
      </motion.p>

      <motion.button
        type="button"
        className="intro__envelope"
        onClick={handleTap}
        aria-label={content.intro.button}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <AnimatedEnvelope open={opening} note={content.intro.letterNote} />
        {opening && <HeartBurst count={10} />}
      </motion.button>

      <motion.p
        className="intro__message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.9 }}
      >
        {content.intro.message}
      </motion.p>

      <motion.button
        type="button"
        className="btn"
        onClick={handleTap}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {opening ? "Continue" : content.intro.button}
      </motion.button>
    </motion.section>
  );
}
