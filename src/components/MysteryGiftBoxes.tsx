import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { birthdayContent as content } from "../data/birthdayContent";
import { useArrive } from "../hooks/useArrive";
import { PolaroidCard } from "./PolaroidCard";

type Props = { advanced: boolean; onContinue: () => void };

export function MysteryGiftBoxes({ advanced, onContinue }: Props) {
  const { items } = content.gifts;
  const ref = useArrive<HTMLElement>();
  /** Indexes of opened boxes, in the order he opened them */
  const [opened, setOpened] = useState<number[]>([]);
  const allOpen = opened.length === items.length;

  const open = (i: number) => setOpened((o) => (o.includes(i) ? o : [...o, i]));

  return (
    <section className="section" ref={ref} aria-labelledby="gifts-title">
      <div className="section__head">
        <h2 id="gifts-title">{content.gifts.title}</h2>
        <p>{content.gifts.subtitle}</p>
      </div>

      <div className="gifts">
        {items.map((_, i) => {
          const isOpen = opened.includes(i);
          return (
            <button
              key={i}
              type="button"
              className={isOpen ? "gift is-open" : "gift"}
              onClick={() => open(i)}
              disabled={isOpen}
              aria-label={isOpen ? `Gift ${i + 1}, opened` : `Open gift ${i + 1}`}
            >
              <span className="gift__glow" />
              <span className="gift__lid">
                <span className="gift__bow" />
              </span>
              <span className="gift__body" />
            </button>
          );
        })}
      </div>

      <div className="gift-reveals" aria-live="polite">
        <AnimatePresence initial={false}>
          {[...opened].reverse().map((i) => {
            const gift = items[i];
            return (
              <motion.article
                key={i}
                layout
                className="card gift-card"
                initial={{ opacity: 0, y: -24, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 170, damping: 18 }}
              >
                <p className="eyebrow">{gift.label}</p>
                {gift.photo && <PolaroidCard photo={gift.photo} tilt={-2} small />}
                <p className="gift-card__text">{gift.text}</p>
              </motion.article>
            );
          })}
        </AnimatePresence>
        {opened.length === 0 && <p className="hint">Tap a box to open it</p>}
      </div>

      {allOpen && !advanced && (
        <motion.button
          type="button"
          className="btn section__next"
          onClick={onContinue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {content.gifts.continueButton} <ArrowRight size={16} aria-hidden="true" />
        </motion.button>
      )}
    </section>
  );
}
