"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X, ArrowRight, AlertTriangle, ShieldCheck, Info, CheckCircle, Shield, Smile, Moon, HeartPulse, Brain, Activity } from "lucide-react";
import { questions, calculateResult, type QuizResult as QuizResultType, type RiskLevel } from "./quiz-data";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizBmiQuestion } from "./QuizBmiQuestion";
import { QuizResult } from "./QuizResult";
import { LeadCapture } from "@/components/LeadCapture";
import { CredentialedList } from "@/components/Credentialed/CredentialedList";
import { Button } from "@/components/ui/Button";

type QuizPhase =
  | "questions"
  | "result"
  | "lead-capture"
  | "full-report"
  | "solution"
  | "credentialed";

interface QuizProps {
  onClose: () => void;
}

// ── Risk-specific report content ──────────────────────────────────
const reportContent: Record<RiskLevel, {
  summary: string;
  impacts: string[];
  recommendation: string;
}> = {
  high: {
    summary: "Há uma probabilidade considerável de que sua respiração esteja sendo interrompida durante o sono, impactando seriamente sua saúde.",
    impacts: [
      "Interrupções respiratórias frequentes reduzem o oxigênio no sangue",
      "Sono fragmentado impede a recuperação do corpo e da mente",
      "Risco aumentado de hipertensão, problemas cardíacos e AVC",
    ],
    recommendation: "Procure um profissional credenciado o mais breve possível. A apneia não tratada tende a se agravar com o tempo.",
  },
  moderate: {
    summary: "Há sinais que merecem atenção. Embora não seja alarmante, o quadro pode se agravar sem acompanhamento.",
    impacts: [
      "Possíveis obstruções parciais das vias aéreas durante o sono",
      "Qualidade do sono comprometida, causando cansaço diurno",
      "Fatores de risco presentes que podem se intensificar",
    ],
    recommendation: "Uma avaliação profissional pode identificar o problema cedo e prevenir complicações futuras.",
  },
  low: {
    summary: "Seus indicadores estão dentro da normalidade. Boa notícia, mas vale manter atenção aos sinais do corpo.",
    impacts: [
      "Fatores de risco em níveis controlados",
      "Padrão de sono aparentemente saudável",
      "Mudanças de peso ou hábitos podem alterar o risco",
    ],
    recommendation: "Se você tem ronco frequente ou cansaço diurno, uma consulta pode garantir que seu sono é realmente reparador.",
  },
};

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
    setPhase("full-report");
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const Topbar = ({ showBack, onBack }: { showBack?: boolean; onBack?: () => void }) => (
    <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-2.5">
      {showBack && onBack ? (
        <button onClick={onBack} className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border-[1.5px] border-border text-text-mid transition-colors hover:border-blue hover:text-blue cursor-pointer" aria-label="Voltar">
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      ) : <div className="w-[34px]" />}
      <div className="w-[34px]" />
      <button onClick={onClose} className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] text-text-light transition-colors hover:text-text cursor-pointer" aria-label="Fechar">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  const report = result ? reportContent[result.riskLevel] : null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm lg:items-center lg:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="relative flex min-h-screen w-full flex-col bg-white lg:min-h-[600px] lg:max-h-[85vh] lg:max-w-[600px] lg:rounded-2xl lg:shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >

        {/* ===== PERGUNTAS ===== */}
        {phase === "questions" && (
          <>
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-2.5">
              <button onClick={goBack} disabled={currentIndex === 0} className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border-[1.5px] border-border text-text-mid transition-colors hover:border-blue hover:text-blue disabled:opacity-30 cursor-pointer" aria-label="Voltar">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="font-heading text-xs font-medium text-text-light tracking-wide">
                <b className="font-semibold text-text">{currentIndex + 1}</b> / {questions.length}
              </span>
              <button onClick={onClose} className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] text-text-light transition-colors hover:text-text cursor-pointer" aria-label="Fechar">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <QuizProgress current={currentIndex + 1} total={questions.length} />
            <div className="flex flex-1 flex-col">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={currentIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} className="flex flex-1 flex-col">
                  {currentQuestion.type === "bmi" ? (
                    <QuizBmiQuestion onSubmit={advance} />
                  ) : (
                    <QuizQuestion question={currentQuestion} selectedIndex={selectedOptionIndex} onSelect={handleRadioSelect} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="shrink-0 border-t border-slate-50 px-5 py-3 text-center">
              <p className="font-body text-[11px] text-text-light">Toque em uma opção para avançar</p>
            </div>
          </>
        )}

        {/* ===== RESULTADO PARCIAL ===== */}
        {phase === "result" && result && (
          <>
            <Topbar />
            <QuizResult result={result} onContinue={() => setPhase("lead-capture")} />
          </>
        )}

        {/* ===== CAPTURA DE LEAD ===== */}
        {phase === "lead-capture" && result && (
          <>
            <Topbar />
            <LeadCapture quizResult={result} onComplete={handleLeadComplete} />
          </>
        )}

        {/* ===== RELATORIO COMPLETO (viewport-fit, sem scroll) ===== */}
        {phase === "full-report" && result && report && (
          <>
            <Topbar />
            <div className="flex flex-1 flex-col px-5 py-4">
              <div className="mx-auto w-full max-w-[480px]">
                {/* Score + label */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${result.riskColor}15` }}>
                    <span className="font-heading text-base font-bold" style={{ color: result.riskColor }}>{result.score}/{result.maxScore}</span>
                  </div>
                  <div>
                    <p className="font-heading text-[10px] font-semibold uppercase tracking-[1.5px]" style={{ color: result.riskColor }}>{result.riskLabel}</p>
                    <h2 className="font-heading text-[17px] font-semibold text-dark tracking-tight">Seu Relatório</h2>
                  </div>
                </div>

                {/* Barra */}
                <div className="mb-4 w-full">
                  <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-green via-yellow-400 via-orange to-red" style={{ width: `${result.percentage}%` }} />
                  </div>
                  <div className="flex justify-between font-body text-[8px] font-medium uppercase tracking-[1px]">
                    <span className="text-green">Baixo</span>
                    <span className="text-text-light">Moderado</span>
                    <span className="text-red">Alto</span>
                  </div>
                </div>

                {/* Sumario */}
                <p className="mb-4 font-body text-[12.5px] leading-relaxed text-text-mid">
                  {report.summary}
                </p>

                {/* Impactos */}
                <div className="mb-4 space-y-2">
                  {report.impacts.map((impact, i) => (
                    <div key={i} className="flex gap-2.5 rounded-xl bg-off-white p-2.5">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: result.riskColor }} />
                      <p className="font-body text-[12px] leading-snug text-text-mid">{impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Espaco */}
              <div className="flex-1" />

              {/* Recomendacao + CTA embaixo */}
              <div className="mx-auto w-full max-w-[480px]">
                <div className="mb-4 rounded-xl border-[1.5px] border-blue/15 bg-blue-light px-3.5 py-3">
                  <div className="mb-1 flex items-center gap-1.5 font-heading text-[11px] font-semibold text-dark">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue" />
                    Recomendação
                  </div>
                  <p className="font-body text-[11.5px] leading-snug text-text-mid">{report.recommendation}</p>
                </div>
                <Button variant="blue" onClick={() => setPhase("solution")}>
                  Ver a solução
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* ===== SOLUCAO EA AIR (viewport-fit, sem scroll) ===== */}
        {phase === "solution" && result && (
          <>
            <Topbar showBack onBack={() => setPhase("full-report")} />
            <div className="flex flex-1 flex-col px-5 py-4">
              <div className="mx-auto w-full max-w-[480px]">
                {/* Header */}
                <div className="mb-4 text-center">
                  <span className="mb-1 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue">
                    A Solução
                  </span>
                  <h2 className="mb-1.5 font-heading text-[20px] font-semibold text-dark tracking-tight">
                    Esthetic Aligner AIR
                  </h2>
                  <p className="mx-auto max-w-[340px] font-body text-[12px] leading-relaxed text-text-mid">
                    Aparelho intraoral que reposiciona a mandíbula durante o sono, mantendo as vias aéreas abertas. Silencioso, portátil, sem eletricidade.
                  </p>
                </div>

                {/* 3 beneficios compactos */}
                <div className="mb-3 space-y-2">
                  {[
                    { icon: Moon, title: "Sono Reparador", desc: "Reduz ronco e pausas respiratórias para um sono profundo e restaurador" },
                    { icon: HeartPulse, title: "Saúde Protegida", desc: "Mantém oxigenação adequada, prevenindo riscos cardiovasculares" },
                    { icon: Smile, title: "Conforto Total", desc: "Design ergonômico e discreto, confortável desde a primeira noite" },
                  ].map((b) => (
                    <div key={b.title} className="flex gap-3 rounded-xl bg-off-white p-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-light">
                        <b.icon className="h-4 w-4 text-blue" />
                      </div>
                      <div>
                        <h5 className="font-heading text-[12.5px] font-semibold text-dark">{b.title}</h5>
                        <p className="font-body text-[11px] leading-snug text-text-mid">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Espaco */}
              <div className="flex-1" />

              {/* Indicacao + CTA embaixo */}
              <div className="mx-auto w-full max-w-[480px]">
                <div className="mb-4 rounded-xl border-[1.5px] border-blue/15 bg-blue-light px-3.5 py-3">
                  <p className="font-body text-[11px] leading-snug text-text-mid">
                    <span className="font-heading font-semibold text-dark">Indicado para</span> adultos com ronco e apneia leve a moderada, ou como alternativa ao CPAP. Sempre com acompanhamento de um profissional credenciado.
                  </p>
                </div>
                <Button variant="primary" onClick={() => setPhase("credentialed")}>
                  Encontrar profissional
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* ===== CREDENCIADOS ===== */}
        {phase === "credentialed" && (
          <>
            <Topbar showBack onBack={() => setPhase("solution")} />
            <div className="flex-1 overflow-y-auto">
              <CredentialedList cep={userCep} />
            </div>
            <div className="shrink-0 border-t border-slate-100 px-5 py-4">
              <div className="mx-auto max-w-[400px]">
                <Button variant="secondary" onClick={onClose}>
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
