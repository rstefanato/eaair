"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X, ArrowRight } from "lucide-react";
import { questions, calculateResult, type QuizResult as QuizResultType } from "./quiz-data";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizBmiQuestion } from "./QuizBmiQuestion";
import { QuizResult } from "./QuizResult";
import { LeadCapture } from "@/components/LeadCapture";
import { FullResult } from "@/components/FullResult";
import { CredentialedList } from "@/components/Credentialed/CredentialedList";
import { Button } from "@/components/ui/Button";

type QuizPhase =
  | "questions"
  | "result"
  | "lead-capture"
  | "full-result"
  | "solution"
  | "credentialed";

const phaseOrder: QuizPhase[] = [
  "questions",
  "result",
  "lead-capture",
  "full-result",
  "solution",
  "credentialed",
];

interface QuizProps {
  onClose: () => void;
}

export function Quiz({ onClose }: QuizProps) {
  const [phase, setPhase] = useState<QuizPhase>("questions");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [userCep, setUserCep] = useState("");

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const goToPhase = (target: QuizPhase) => {
    setPhase(target);
  };

  const goBackPhase = () => {
    const currentIdx = phaseOrder.indexOf(phase);
    if (currentIdx > 0) {
      // Don't allow going back past lead-capture (data already submitted)
      const prev = phaseOrder[currentIdx - 1];
      if (prev === "lead-capture" || prev === "result" || prev === "questions") return;
      setPhase(prev);
    }
  };

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

  const handleLeadComplete = (cep: string) => {
    setUserCep(cep);
    goToPhase("full-result");
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  // Topbar with optional back button and close
  const Topbar = ({ showBack, onBack }: { showBack?: boolean; onBack?: () => void }) => (
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-2.5">
      {showBack && onBack ? (
        <button
          onClick={onBack}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border-[1.5px] border-border text-text-mid transition-colors hover:border-blue hover:text-blue cursor-pointer"
          aria-label="Voltar"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      ) : (
        <div className="w-[34px]" />
      )}
      <div className="w-[34px]" />
      <button
        onClick={onClose}
        className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] text-text-light transition-colors hover:text-text cursor-pointer"
        aria-label="Fechar"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  // Bottom navigation for post-lead phases
  const BottomNav = ({ onNext, nextLabel, showBack, onBack }: {
    onNext: () => void;
    nextLabel: string;
    showBack?: boolean;
    onBack?: () => void;
  }) => (
    <div className="border-t border-slate-100 px-5 py-4">
      <div className="mx-auto flex max-w-[400px] gap-3">
        {showBack && onBack && (
          <Button variant="secondary" onClick={onBack} className="w-auto px-5">
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>
        )}
        <Button variant="blue" onClick={onNext} className="flex-1">
          {nextLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm lg:items-center lg:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="relative flex min-h-screen w-full flex-col bg-white lg:min-h-[600px] lg:max-h-[85vh] lg:max-w-[600px] lg:rounded-2xl lg:shadow-2xl lg:overflow-y-auto"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ===== FASE: PERGUNTAS ===== */}
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
              <button
                onClick={onClose}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] text-text-light transition-colors hover:text-text cursor-pointer"
                aria-label="Fechar"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <QuizProgress current={currentIndex + 1} total={questions.length} />

            <div className="flex flex-1 flex-col">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-1 flex-col"
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
            </div>

            <div className="border-t border-slate-50 px-5 py-3 text-center">
              <p className="font-body text-[11px] text-text-light">
                Toque em uma opção para avançar
              </p>
            </div>
          </>
        )}

        {/* ===== FASE: RESULTADO PARCIAL ===== */}
        {phase === "result" && result && (
          <>
            <Topbar />
            <QuizResult result={result} onContinue={() => goToPhase("lead-capture")} />
          </>
        )}

        {/* ===== FASE: CAPTURA DE LEAD ===== */}
        {phase === "lead-capture" && result && (
          <>
            <Topbar />
            <LeadCapture quizResult={result} onComplete={handleLeadComplete} />
          </>
        )}

        {/* ===== FASE: RESULTADO COMPLETO ===== */}
        {phase === "full-result" && result && (
          <>
            <Topbar />
            <div className="flex-1 overflow-y-auto">
              <FullResult result={result} />
            </div>
            <BottomNav
              onNext={() => goToPhase("solution")}
              nextLabel="Ver a solução"
            />
          </>
        )}

        {/* ===== FASE: SOLUCAO EA AIR ===== */}
        {phase === "solution" && result && (
          <>
            <Topbar showBack onBack={() => goToPhase("full-result")} />
            <div className="flex flex-1 flex-col px-5 py-6">
              {/* Copy em cima */}
              <div className="text-center">
                <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue">
                  A Solução
                </span>
                <h2 className="mb-2 font-heading text-[22px] font-semibold text-dark tracking-tight">
                  Esthetic Aligner AIR
                </h2>
                <p className="mx-auto max-w-[400px] font-body text-sm leading-relaxed text-text-mid">
                  Uma solução confortável e acessível para ronco e apneia. O EA Air ajuda a reduzir o ronco e as interrupções respiratórias, promovendo um sono profundo e reparador.
                </p>
              </div>

              {/* Espaco */}
              <div className="flex-1 min-h-4" />

              {/* Benefits embaixo */}
              <div className="space-y-3">
                {[
                  { title: "Melhora na Qualidade do Sono", desc: "Reduz o ronco e interrupções respiratórias, garantindo noites mais tranquilas e reparadoras." },
                  { title: "Saúde Respiratória", desc: "Melhora a oxigenação e ajuda a prevenir complicações como hipertensão e doenças cardiovasculares." },
                  { title: "Conforto e Discrição", desc: "Design estético, confortável e discreto que se adapta à rotina noturna." },
                ].map((b) => (
                  <div key={b.title} className="rounded-2xl border-[1.5px] border-border bg-off-white p-4">
                    <h3 className="mb-0.5 font-heading text-[14px] font-semibold text-dark">{b.title}</h3>
                    <p className="font-body text-[12.5px] leading-relaxed text-text-mid">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <BottomNav
              showBack
              onBack={() => goToPhase("full-result")}
              onNext={() => goToPhase("credentialed")}
              nextLabel="Encontrar especialista"
            />
          </>
        )}

        {/* ===== FASE: CREDENCIADOS ===== */}
        {phase === "credentialed" && (
          <>
            <Topbar showBack onBack={() => goToPhase("solution")} />
            <div className="flex-1 overflow-y-auto">
              <CredentialedList cep={userCep} />
            </div>
            <div className="border-t border-slate-100 px-5 py-4">
              <div className="mx-auto max-w-[400px]">
                <Button variant="secondary" onClick={onClose} className="w-full">
                  Fechar
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
