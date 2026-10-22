import { useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { birthdayContent as content } from "./data/birthdayContent";
import { BirthdayIntro } from "./components/BirthdayIntro";
import { FloatingParticles } from "./components/FloatingParticles";
import { ScrollProgress } from "./components/ScrollProgress";
import { MemoryGallery } from "./components/MemoryGallery";
import { CoupleQuiz } from "./components/CoupleQuiz";
import { HeartCatchingGame } from "./components/HeartCatchingGame";
import { MysteryGiftBoxes } from "./components/MysteryGiftBoxes";
import { FinalLoveLetter } from "./components/FinalLoveLetter";

/** Chapters unlock in order: 0 memories + quiz, 1 game, 2 gifts, 3 letter. */
const LAST_STAGE = 3;

function Hero() {
  const { scrollY } = useScroll();
  // Gentle depth: the title drifts and fades as he starts to scroll.
  const y = useTransform(scrollY, [0, 500], [0, 90]);
  const opacity = useTransform(scrollY, [0, 420], [1, 0]);

  return (
    <header className="hero">
      <motion.div className="hero__inner" style={{ y, opacity }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {content.hero.eyebrow}
        </motion.p>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {content.hero.title} <em>{content.name}</em>
        </motion.h1>
        <motion.p
          className="hero__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          {content.hero.subtitle}
        </motion.p>
      </motion.div>
      <motion.div
        className="scroll-cue"
        aria-hidden="true"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span>scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </header>
  );
}

function Experience({ onRestart }: { onRestart: () => void }) {
  const [opened, setOpened] = useState(false);
  const [stage, setStage] = useState(0);
  const unlock = (next: number) => setStage((s) => Math.max(s, next));

  return (
    <>
      <FloatingParticles />

      <AnimatePresence>
        {!opened && (
          <BirthdayIntro
            key="intro"
            onOpen={() => {
              window.scrollTo(0, 0);
              setOpened(true);
            }}
          />
        )}
      </AnimatePresence>

      {opened && (
        <>
          <ScrollProgress unlocked={stage + 2} total={LAST_STAGE + 2} />
          <main className="journey">
            <Hero />
            <MemoryGallery />
            <CoupleQuiz advanced={stage >= 1} onContinue={() => unlock(1)} />
            {stage >= 1 && (
              <HeartCatchingGame advanced={stage >= 2} onContinue={() => unlock(2)} />
            )}
            {stage >= 2 && (
              <MysteryGiftBoxes advanced={stage >= 3} onContinue={() => unlock(3)} />
            )}
            {stage >= 3 && <FinalLoveLetter onRestart={onRestart} />}
          </main>
        </>
      )}
    </>
  );
}

export default function App() {
  // Changing the key remounts everything, which is how "Start again" works.
  const [run, setRun] = useState(0);
  return (
    <MotionConfig reducedMotion="user">
      <Experience
        key={run}
        onRestart={() => {
          window.scrollTo(0, 0);
          setRun((n) => n + 1);
        }}
      />
    </MotionConfig>
  );
}
