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
  title: string;
  summary: string;
  details: string[];
  symptoms: string[];
  recommendation: string;
}> = {
  high: {
    title: "Risco Elevado de Apneia Obstrutiva do Sono",
    summary: "Seus indicadores apontam para um risco significativo de Apneia Obstrutiva do Sono (AOS). Isso significa que há uma probabilidade considerável de que sua respiração esteja sendo interrompida durante o sono, o que pode impactar seriamente sua saúde.",
    details: [
      "Interrupções respiratórias frequentes durante o sono, podendo ocorrer dezenas de vezes por hora",
      "Redução significativa dos níveis de oxigênio no sangue durante a noite",
      "Fragmentação do sono profundo, impedindo a recuperação adequada do corpo",
      "Sobrecarga do sistema cardiovascular causada pelos episódios de apneia",
      "Alterações hormonais e metabólicas associadas à privação crônica de sono reparador",
    ],
    symptoms: [
      "Ronco alto e frequente, com possíveis engasgos",
      "Sonolência diurna excessiva mesmo após dormir muitas horas",
      "Dores de cabeça matinais recorrentes",
      "Dificuldade de concentração e memória",
      "Irritabilidade e alterações de humor",
      "Boca seca ou dor de garganta ao acordar",
    ],
    recommendation: "Recomendamos fortemente que você procure um profissional credenciado o mais breve possível. A apneia do sono não tratada está associada a riscos sérios como hipertensão, problemas cardíacos, AVC e diabetes tipo 2.",
  },
  moderate: {
    title: "Risco Moderado de Apneia Obstrutiva do Sono",
    summary: "Seus indicadores sugerem um risco moderado de Apneia Obstrutiva do Sono (AOS). Embora não seja um quadro alarmante, há sinais que merecem atenção e acompanhamento profissional.",
    details: [
      "Possíveis episódios de obstrução parcial das vias aéreas durante o sono",
      "Redução leve a moderada na qualidade do sono profundo",
      "Potencial para agravamento do quadro sem acompanhamento adequado",
      "Fatores de risco presentes que podem intensificar os sintomas com o tempo",
    ],
    symptoms: [
      "Ronco ocasional a frequente",
      "Cansaço ao acordar, mesmo tendo dormido",
      "Sonolência em momentos de baixa atividade",
      "Dificuldade para manter o foco por períodos prolongados",
      "Possíveis dores de cabeça ao acordar",
    ],
    recommendation: "Uma avaliação profissional é recomendada para entender melhor seu quadro. Identificar e tratar a apneia nesta fase pode prevenir complicações futuras.",
  },
  low: {
    title: "Risco Baixo de Apneia Obstrutiva do Sono",
    summary: "Seus indicadores estão dentro da normalidade para Apneia Obstrutiva do Sono (AOS). Isso é uma boa notícia, mas vale manter atenção aos sinais do corpo.",
    details: [
      "Seus fatores de risco estão em níveis controlados",
      "Padrão de sono aparentemente saudável com base nas respostas",
      "Indicadores de saúde respiratória dentro do esperado",
    ],
    symptoms: [
      "Se você ainda assim apresenta ronco frequente, vale investigar",
      "Cansaço persistente pode ter outras causas que merecem atenção",
      "Mudanças de peso ou hábitos podem alterar o risco no futuro",
    ],
    recommendation: "Embora seu risco atual seja baixo, se você apresenta sintomas como ronco frequente ou cansaço diurno, uma consulta profissional pode ajudar a garantir que seu sono está sendo realmente reparador.",
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

        {/* ===== RELATORIO COMPLETO ===== */}
        {phase === "full-report" && result && report && (
          <>
            <Topbar />
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div className="mx-auto max-w-[480px]">
                {/* Header com score */}
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: `${result.riskColor}15` }}>
                    <span className="font-heading text-lg font-bold" style={{ color: result.riskColor }}>{result.score}/{result.maxScore}</span>
                  </div>
                  <p className="mb-1 font-heading text-[11px] font-semibold uppercase tracking-[2px]" style={{ color: result.riskColor }}>
                    {result.riskLabel}
                  </p>
                  <h2 className="font-heading text-[20px] font-semibold text-dark tracking-tight">
                    Seu Relatório Completo
                  </h2>
                </div>

                {/* Barra de risco */}
                <div className="mb-8 mx-auto w-full max-w-[280px]">
                  <div className="mb-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-green via-yellow-400 via-orange to-red" style={{ width: `${result.percentage}%` }} />
                  </div>
                  <div className="flex justify-between font-body text-[9px] font-medium uppercase tracking-[1px]">
                    <span className="text-green">Baixo</span>
                    <span className="text-text-light">Moderado</span>
                    <span className="text-red">Alto</span>
                  </div>
                </div>

                {/* Titulo e sumario */}
                <h3 className="mb-2 font-heading text-[16px] font-semibold text-dark">
                  {report.title}
                </h3>
                <p className="mb-6 font-body text-[13px] leading-relaxed text-text-mid">
                  {report.summary}
                </p>

                {/* O que isso significa */}
                <div className="mb-6">
                  <h4 className="mb-3 flex items-center gap-2 font-heading text-[14px] font-semibold text-dark">
                    <Info className="h-4 w-4 text-blue" />
                    O que isso significa
                  </h4>
                  <div className="space-y-2">
                    {report.details.map((detail, i) => (
                      <div key={i} className="flex gap-2.5 rounded-xl bg-off-white p-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-light font-heading text-[10px] font-semibold text-blue">{i + 1}</span>
                        <p className="font-body text-[12.5px] leading-relaxed text-text-mid">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sintomas a observar */}
                <div className="mb-6">
                  <h4 className="mb-3 flex items-center gap-2 font-heading text-[14px] font-semibold text-dark">
                    <AlertTriangle className="h-4 w-4 text-orange" />
                    Sintomas a observar
                  </h4>
                  <div className="rounded-2xl border-[1.5px] border-border bg-white p-4">
                    {report.symptoms.map((symptom, i) => (
                      <div key={i} className="flex items-start gap-2 py-1.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: result.riskColor }} />
                        <p className="font-body text-[12.5px] leading-relaxed text-text-mid">{symptom}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recomendacao */}
                <div className="mb-2 rounded-2xl border-[1.5px] border-blue/15 bg-blue-light p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-heading text-[13px] font-semibold text-dark">
                    <ShieldCheck className="h-4 w-4 text-blue" />
                    Recomendação
                  </h4>
                  <p className="font-body text-[12.5px] leading-relaxed text-text-mid">
                    {report.recommendation}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="shrink-0 border-t border-slate-100 px-5 py-4">
              <div className="mx-auto max-w-[400px]">
                <Button variant="blue" onClick={() => setPhase("solution")}>
                  Ver a solução
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* ===== SOLUCAO EA AIR ===== */}
        {phase === "solution" && result && (
          <>
            <Topbar showBack onBack={() => setPhase("full-report")} />
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div className="mx-auto max-w-[480px]">
                {/* Header */}
                <div className="mb-6 text-center">
                  <span className="mb-2 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue">
                    A Solução
                  </span>
                  <h2 className="mb-2 font-heading text-[22px] font-semibold text-dark tracking-tight">
                    Esthetic Aligner AIR
                  </h2>
                  <p className="mx-auto max-w-[380px] font-body text-[13px] leading-relaxed text-text-mid">
                    Uma solução confortável e acessível para ronco e apneia obstrutiva do sono, desenvolvida para melhorar sua qualidade de vida.
                  </p>
                </div>

                {/* O que e */}
                <div className="mb-6">
                  <h4 className="mb-3 font-heading text-[14px] font-semibold text-dark">
                    O que é o EA Air?
                  </h4>
                  <p className="mb-3 font-body text-[13px] leading-relaxed text-text-mid">
                    O EA Air é um aparelho intraoral — semelhante a um alinhador dentário — que é utilizado durante o sono. Ele atua reposicionando suavemente a mandíbula para manter as vias aéreas abertas, reduzindo o ronco e as interrupções respiratórias.
                  </p>
                  <p className="font-body text-[13px] leading-relaxed text-text-mid">
                    Diferente do CPAP (máquina de pressão positiva), o EA Air é silencioso, portátil e não requer eletricidade — ideal para uso diário e em viagens.
                  </p>
                </div>

                {/* Beneficios */}
                <div className="mb-6 space-y-3">
                  {[
                    { icon: Moon, title: "Sono Reparador", desc: "Reduz significativamente o ronco e as pausas respiratórias, permitindo que você atinja as fases profundas do sono essenciais para a recuperação do corpo." },
                    { icon: HeartPulse, title: "Proteção Cardiovascular", desc: "Ao manter a oxigenação adequada durante a noite, ajuda a prevenir hipertensão, arritmias e outros problemas cardiovasculares associados à apneia." },
                    { icon: Brain, title: "Clareza Mental", desc: "Com sono de qualidade, você acorda com mais energia, melhor concentração, memória mais afiada e humor estável ao longo do dia." },
                    { icon: Smile, title: "Conforto e Discrição", desc: "Design estético e ergonômico que se adapta à sua arcada. Confortável desde a primeira noite, sem barulho e sem fios." },
                    { icon: Activity, title: "Fácil de Usar", desc: "Sem máquinas, sem manutenção complexa. Basta posicionar antes de dormir. Prático para o dia a dia e viagens." },
                    { icon: Shield, title: "Acompanhamento Profissional", desc: "Adaptado por um dentista credenciado especializado em sono, garantindo o encaixe perfeito e o melhor resultado para o seu caso." },
                  ].map((b) => (
                    <div key={b.title} className="flex gap-3.5 rounded-2xl border-[1.5px] border-border bg-off-white p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-light">
                        <b.icon className="h-[18px] w-[18px] text-blue" />
                      </div>
                      <div>
                        <h5 className="mb-0.5 font-heading text-[13px] font-semibold text-dark">{b.title}</h5>
                        <p className="font-body text-[12px] leading-relaxed text-text-mid">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Para quem */}
                <div className="mb-2 rounded-2xl border-[1.5px] border-blue/15 bg-blue-light p-4">
                  <h4 className="mb-2 font-heading text-[13px] font-semibold text-dark">
                    Para quem é indicado?
                  </h4>
                  <p className="font-body text-[12.5px] leading-relaxed text-text-mid">
                    O EA Air é indicado para adultos com ronco primário e apneia obstrutiva do sono leve a moderada, ou como alternativa ao CPAP em casos onde o paciente não se adaptou ao equipamento. A indicação é sempre feita por um profissional credenciado após avaliação.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="shrink-0 border-t border-slate-100 px-5 py-4">
              <div className="mx-auto max-w-[400px]">
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
