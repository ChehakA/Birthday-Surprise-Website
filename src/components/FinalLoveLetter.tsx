import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MailOpen, RotateCcw } from "lucide-react";
import { birthdayContent as content } from "../data/birthdayContent";
import { prefersReducedMotion, useArrive } from "../hooks/useArrive";
import { HeartBurst } from "./HeartBurst";
import { PolaroidCard } from "./PolaroidCard";

export function FinalLoveLetter({ onRestart }: { onRestart: () => void }) {
  const { letter } = content;
  const ref = useArrive<HTMLElement>();
  const finalRef = useRef<HTMLDivElement>(null);
  const [unfolded, setUnfolded] = useState(false);
  const [lastRevealed, setLastRevealed] = useState(false);

  useEffect(() => {
    if (!lastRevealed) return;
    const id = window.setTimeout(() => {
      finalRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center",
      });
    }, 150);
    return () => window.clearTimeout(id);
  }, [lastRevealed]);

  return (
    <section className="section section--final" ref={ref} aria-labelledby="letter-title">
      <div className="final__glow" aria-hidden="true" />

      <motion.h2
        id="letter-title"
        className="final__heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1 }}
      >
        {letter.heading}
      </motion.h2>

      <motion.div
        className={lastRevealed ? "final__photo is-glowing" : "final__photo"}
        initial={{ opacity: 0, y: 40, rotate: -8 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <PolaroidCard photo={letter.favoritePhoto} tilt={2} glow />
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {!unfolded ? (
          <motion.button
            key="folded"
            type="button"
            className="letter-folded"
            onClick={() => setUnfolded(true)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scaleY: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <MailOpen size={22} strokeWidth={1.25} aria-hidden="true" />
            <span>{letter.unfoldHint}</span>
          </motion.button>
        ) : (
          <motion.article
            key="letter"
            className="letter"
            initial={{ opacity: 0, scaleY: 0.5 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {letter.paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.7 }}
              >
                {text}
              </motion.p>
            ))}
            {letter.signature && (
              <motion.p
                className="letter__signature"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5 + letter.paragraphs.length * 0.7 }}
              >
                {letter.signature}
              </motion.p>
            )}
          </motion.article>
        )}
      </AnimatePresence>

      {unfolded && !lastRevealed && (
        <motion.button
          type="button"
          className="btn section__next"
          onClick={() => setLastRevealed(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + letter.paragraphs.length * 0.7 }}
        >
          {letter.lastButton}
        </motion.button>
      )}

      {lastRevealed && (
        <div className="final__last" ref={finalRef}>
          <HeartBurst count={16} />
          <motion.p
            className="final__message"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {letter.finalMessage}
          </motion.p>
          <motion.button
            type="button"
            className="link-btn"
            onClick={onRestart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
          >
            <RotateCcw size={13} aria-hidden="true" /> {letter.restartButton}
          </motion.button>
        </div>
      )}
    </section>
  );
}
