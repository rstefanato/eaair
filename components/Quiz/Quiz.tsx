"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { questions, calculateResult, type QuizResult as QuizResultType } from "./quiz-data";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizBmiQuestion } from "./QuizBmiQuestion";
import { QuizResult } from "./QuizResult";

type QuizPhase = "questions" | "result";

interface QuizProps {
  onComplete: (result: QuizResultType) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [phase, setPhase] = useState<QuizPhase>("questions");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [result, setResult] = useState<QuizResultType | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const advance = useCallback(
    (points: number) => {
      const newAnswers = { ...answers, [currentQuestion.id]: points };
      setAnswers(newAnswers);

      if (isLastQuestion) {
        const quizResult = calculateResult(newAnswers);
        setResult(quizResult);
        setPhase("result");
      } else {
        setDirection(1);
        setTimeout(() => {
          setSelectedOptionIndex(null);
          setCurrentIndex((prev) => prev + 1);
        }, 300);
      }
    },
    [answers, currentQuestion, isLastQuestion]
  );

  const handleRadioSelect = (optionIndex: number, points: number) => {
    setSelectedOptionIndex(optionIndex);
    setTimeout(() => advance(points), 300);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setSelectedOptionIndex(null);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResultContinue = () => {
    if (result) onComplete(result);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="quiz" className="bg-white">
      <div className="mx-auto max-w-[600px]">
        {phase === "questions" && (
          <>
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-2.5">
              <button
                onClick={goBack}
                disabled={currentIndex === 0}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border-[1.5px] border-border text-text-mid transition-colors hover:border-blue hover:text-blue disabled:opacity-30 cursor-pointer"
                aria-label="Voltar"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="font-heading text-xs font-medium text-text-light tracking-wide">
                <b className="font-semibold text-text">{currentIndex + 1}</b> / {questions.length}
              </span>
              <button className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] text-text-light cursor-pointer" aria-label="Fechar">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <QuizProgress current={currentIndex + 1} total={questions.length} />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="flex min-h-[480px] flex-col"
              >
                {currentQuestion.type === "bmi" ? (
                  <QuizBmiQuestion onSubmit={advance} />
                ) : (
                  <QuizQuestion
                    question={currentQuestion}
                    selectedIndex={selectedOptionIndex}
                    onSelect={handleRadioSelect}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="border-t border-slate-50 px-5 py-3 text-center">
              <p className="font-body text-[11px] text-text-light">
                Toque em uma opcao para avancar
              </p>
            </div>
          </>
        )}

        {phase === "result" && result && (
          <QuizResult result={result} onContinue={handleResultContinue} />
        )}
      </div>
    </section>
  );
}
