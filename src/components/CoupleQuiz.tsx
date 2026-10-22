import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import { birthdayContent as content } from "../data/birthdayContent";

type Props = {
  /** True once he has moved on to the next chapter */
  advanced: boolean;
  onContinue: () => void;
};

export function CoupleQuiz({ advanced, onContinue }: Props) {
  const { questions, results } = content.quiz;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const finished = index >= questions.length;
  const q = questions[Math.min(index, questions.length - 1)];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  const resultLine =
    score === questions.length ? results.perfect : score === 0 ? results.none : results.some;

  return (
    <section className="section" aria-labelledby="quiz-title">
      <motion.div
        className="section__head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9 }}
      >
        <h2 id="quiz-title">{content.quiz.title}</h2>
        <p>{content.quiz.subtitle}</p>
      </motion.div>

      <motion.div
        className="card quiz"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="quiz__progress" aria-hidden="true">
          {questions.map((_, i) => (
            <span
              key={i}
              className={i < index || finished ? "is-done" : i === index ? "is-current" : ""}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {finished ? (
            <motion.div
              key="result"
              className="quiz__result"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              aria-live="polite"
            >
              <p className="quiz__score">
                {score} <span>of {questions.length}</span>
              </p>
              <p className="quiz__result-line">{resultLine}</p>
              <p className="quiz__result-note">{content.quiz.resultNote}</p>
              {!advanced && (
                <button type="button" className="btn" onClick={onContinue}>
                  {content.quiz.continueButton} <ArrowRight size={16} aria-hidden="true" />
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="quiz__count">
                Question {index + 1} of {questions.length}
              </p>
              <h3 className="quiz__question">{q.question}</h3>

              <div className="quiz__answers">
                {q.answers.map((a, i) => {
                  const state =
                    picked === null
                      ? ""
                      : i === picked
                        ? "is-picked"
                        : i === q.correct
                          ? "is-answer"
                          : "is-faded";
                  return (
                    <motion.button
                      key={a.text}
                      type="button"
                      className={`answer ${state}`}
                      onClick={() => choose(i)}
                      disabled={picked !== null}
                      whileTap={{ scale: 0.97 }}
                      animate={i === picked ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                      transition={{ duration: 0.35 }}
                    >
                      <span>{a.text}</span>
                      {picked !== null && i === q.correct && (
                        <Heart size={15} fill="currentColor" strokeWidth={0} aria-label="My answer" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="quiz__feedback" aria-live="polite">
                {picked !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p>{q.answers[picked].reply}</p>
                    <button type="button" className="btn btn--ghost" onClick={next}>
                      {index + 1 === questions.length ? "See how you did" : "Next question"}
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
