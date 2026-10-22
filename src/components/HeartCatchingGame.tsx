import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import { birthdayContent as content } from "../data/birthdayContent";
import { prefersReducedMotion, useArrive } from "../hooks/useArrive";

type Spot = { id: number; x: number; y: number };
type Props = { advanced: boolean; onContinue: () => void };

/** How long a heart waits before hopping somewhere new (ms). Generous on purpose. */
const HOP_DELAY = 1700;
let nextId = 1;

function newSpot(prev?: Spot | null): Spot {
  let x = 50;
  let y = 50;
  for (let tries = 0; tries < 12; tries++) {
    x = 14 + Math.random() * 72;
    y = 18 + Math.random() * 64;
    if (!prev || Math.hypot(x - prev.x, y - prev.y) > 28) break;
  }
  return { id: nextId++, x, y };
}

export function HeartCatchingGame({ advanced, onContinue }: Props) {
  const { goal } = content.game;
  const ref = useArrive<HTMLElement>();
  const [status, setStatus] = useState<"idle" | "playing" | "done">("idle");
  const [count, setCount] = useState(0);
  const [heart, setHeart] = useState<Spot | null>(null);
  const [bursts, setBursts] = useState<Spot[]>([]);

  // While playing, an uncaught heart hops to a new place. With reduced
  // motion on, hearts simply stay put until they are tapped.
  useEffect(() => {
    if (status !== "playing" || !heart || prefersReducedMotion()) return;
    const id = window.setTimeout(() => setHeart((h) => newSpot(h)), HOP_DELAY);
    return () => window.clearTimeout(id);
  }, [status, heart]);

  const start = () => {
    setCount(0);
    setHeart(newSpot());
    setStatus("playing");
  };

  const catchHeart = () => {
    if (!heart || status !== "playing") return;
    const caught = heart;
    setBursts((b) => [...b, caught]);
    window.setTimeout(() => setBursts((b) => b.filter((s) => s.id !== caught.id)), 700);

    const total = count + 1;
    setCount(total);
    if (total >= goal) {
      setHeart(null);
      setStatus("done");
    } else {
      setHeart(newSpot(caught));
    }
  };

  return (
    <section className="section" ref={ref} aria-labelledby="game-title">
      <div className="section__head">
        <h2 id="game-title">{content.game.title}</h2>
        <p>{content.game.instructions}</p>
      </div>

      <div className="card game">
        <p className="game__counter" aria-live="polite">
          {content.game.counterLabel}: <strong>{count}</strong>/{goal}
        </p>

        <div className="game__area">
          {status === "idle" && (
            <button type="button" className="btn game__start" onClick={start}>
              {content.game.startButton}
            </button>
          )}

          {heart && (
            <button
              key={heart.id}
              type="button"
              className="game__heart"
              style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
              onPointerDown={(e) => {
                e.preventDefault();
                catchHeart();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  catchHeart();
                }
              }}
              aria-label="Catch this heart"
            >
              <Heart size={38} fill="currentColor" strokeWidth={0} />
            </button>
          )}

          {bursts.map((b) => (
            <span
              key={b.id}
              className="pop"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              aria-hidden="true"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <i key={i} style={{ "--angle": `${i * 45}deg` } as CSSProperties} />
              ))}
            </span>
          ))}

          {status === "done" && (
            <motion.div
              className="game__done"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <Heart size={30} fill="currentColor" strokeWidth={0} aria-hidden="true" />
              <p>{content.game.completionMessage}</p>
            </motion.div>
          )}
        </div>
      </div>

      {status === "done" && !advanced && (
        <motion.button
          type="button"
          className="btn section__next"
          onClick={onContinue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {content.game.continueButton} <ArrowRight size={16} aria-hidden="true" />
        </motion.button>
      )}
    </section>
  );
}
