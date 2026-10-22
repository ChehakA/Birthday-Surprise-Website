import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { RotateCw, Sparkles } from "lucide-react";
import { birthdayContent as content, type Memory } from "../data/birthdayContent";
import { PolaroidCard } from "./PolaroidCard";

const TILTS = [-3, 2.5, -2];
const inView = { once: true, amount: 0.45 } as const;

/** Photo slides up and out of an envelope when it scrolls into view. */
function EnvelopeMemory({ memory, tilt }: { memory: Memory; tilt: number }) {
  return (
    <div className="memory-envelope">
      <motion.div
        className="memory-envelope__photo"
        initial={{ y: 150, scale: 0.72, opacity: 0 }}
        whileInView={{ y: 0, scale: 1, opacity: 1 }}
        viewport={inView}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
      >
        <PolaroidCard photo={memory} tilt={tilt} />
      </motion.div>
      <div className="memory-envelope__pocket" aria-hidden="true" />
    </div>
  );
}

/** Tap the photo to flip it and read the note on the back. */
function FlipMemory({ memory, tilt }: { memory: Memory; tilt: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      className="memory-flip"
      initial={{ opacity: 0, y: 50, rotate: tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={inView}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <button
        type="button"
        className={flipped ? "flip is-flipped" : "flip"}
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? "Flip the photo back" : "Flip the photo to read the back"}
      >
        <span className="flip__inner">
          <span className="flip__face flip__face--front">
            <PolaroidCard photo={memory} tilt={tilt} />
          </span>
          <span className="flip__face flip__face--back" style={{ rotate: `${tilt}deg` }}>
            <span className="flip__note">{memory.backMessage}</span>
          </span>
        </span>
      </button>
      <p className="hint">
        <RotateCw size={13} aria-hidden="true" /> {flipped ? "Tap to flip back" : "Tap the photo"}
      </p>
    </motion.div>
  );
}

/** Hidden behind a mystery card until tapped. */
function MysteryMemory({ memory, tilt }: { memory: Memory; tilt: number }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <motion.div
      className="memory-mystery"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {revealed ? (
          <motion.div
            key="photo"
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
          >
            <PolaroidCard photo={memory} tilt={tilt} glow />
          </motion.div>
        ) : (
          <motion.button
            key="cover"
            type="button"
            className="mystery-card"
            onClick={() => setRevealed(true)}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <Sparkles size={26} strokeWidth={1.25} aria-hidden="true" />
            <span className="mystery-card__title">One more</span>
            <span className="mystery-card__hint">Tap to reveal</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MemoryItem({ memory, index }: { memory: Memory; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Subtle parallax: each photo drifts a little slower than the page.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const tilt = TILTS[index % TILTS.length];

  return (
    <div className="memory" ref={ref}>
      <motion.div style={{ y }}>
        {memory.reveal === "flip" ? (
          <FlipMemory memory={memory} tilt={tilt} />
        ) : memory.reveal === "mystery" ? (
          <MysteryMemory memory={memory} tilt={tilt} />
        ) : (
          <EnvelopeMemory memory={memory} tilt={tilt} />
        )}
      </motion.div>
    </div>
  );
}

export function MemoryGallery() {
  return (
    <section className="section" aria-labelledby="memories-title">
      <motion.div
        className="section__head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9 }}
      >
        <h2 id="memories-title">{content.memories.title}</h2>
        <p>{content.memories.subtitle}</p>
      </motion.div>

      <div className="memories">
        {content.memories.photos.map((memory, i) => (
          <MemoryItem key={memory.src + i} memory={memory} index={i} />
        ))}
      </div>
    </section>
  );
}
