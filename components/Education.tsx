"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerChildren, staggerItem } from "@/components/ui/FadeIn";
import { CountUp } from "@/components/ui/CountUp";
import { Moon, AlertTriangle, Activity, HeartPulse, Brain, Zap } from "lucide-react";

const risks = [
  { label: "Infarto", icon: HeartPulse },
  { label: "AVC", icon: Brain },
  { label: "Hipertensão", icon: Activity },
  { label: "Diabetes", icon: Zap },
  { label: "Depressão", icon: Moon },
  { label: "Perda de memória", icon: AlertTriangle },
];

const cards = [
  {
    icon: Moon,
    title: "O que é Apneia?",
    description:
      "A Apneia Obstrutiva do Sono (AOS) ocorre quando há interrupções na respiração durante o sono, causando despertares e redução do oxigênio no sangue.",
  },
  {
    icon: AlertTriangle,
    title: "Sinais de Alerta",
    description:
      "Ronco alto, cansaço diurno excessivo, dor de cabeça matinal, boca seca ao acordar e dificuldade de concentração.",
  },
  {
    icon: Activity,
    title: "Quem tem Risco?",
    description:
      "Presente em 1 a cada 3 pessoas. Fatores: sobrepeso, circunferência do pescoço elevada, idade acima de 50 anos e histórico familiar.",
  },
];

interface EducationProps {
  onStartQuiz: () => void;
}

export function Education({ onStartQuiz }: EducationProps) {
  return (
    <section id="educacao" className="bg-off-white px-5 py-16 md:py-24">
      <div className="mx-auto max-w-[1000px]">
        {/* Header */}
        <FadeIn className="mb-10 text-center md:mb-14">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue">
            Entenda o Problema
          </span>
          <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight md:text-[30px]">
            Ronco e Apneia Obstrutiva do Sono
          </h2>
          <p className="mx-auto max-w-[480px] font-body text-sm text-text-mid leading-relaxed">
            O ronco é ruim, mas a apneia impacta diretamente a saúde do paciente.
          </p>
        </FadeIn>

        {/* Impact stats with count-up */}
        <FadeIn className="mb-10 grid grid-cols-2 gap-4 md:gap-6" delay={0.1}>
          <div className="rounded-2xl border-[1.5px] border-border bg-white p-5 text-center transition-shadow duration-300 hover:shadow-lg">
            <div className="mb-1 font-heading text-[28px] font-semibold text-blue tracking-tight">
              <CountUp end={40} suffix="%" />
            </div>
            <p className="font-body text-xs text-text-mid">das pessoas roncam</p>
          </div>
          <div className="rounded-2xl border-[1.5px] border-border bg-white p-5 text-center transition-shadow duration-300 hover:shadow-lg">
            <div className="mb-1 font-heading text-[28px] font-semibold text-red tracking-tight">
              <CountUp end={33} suffix="%" />
            </div>
            <p className="font-body text-xs text-text-mid">apresentam apneia</p>
          </div>
        </FadeIn>

        {/* Info cards */}
        <StaggerChildren className="mb-12 grid gap-4 md:grid-cols-3 md:gap-6" staggerDelay={0.15}>
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="rounded-2xl border-[1.5px] border-border bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-light transition-transform duration-300 group-hover:scale-110">
                <card.icon className="h-5 w-5 text-blue" />
              </div>
              <h3 className="mb-2 font-heading text-[15px] font-semibold text-dark">
                {card.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed text-text-mid">
                {card.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* Risks */}
        <FadeIn className="mb-10">
          <div className="rounded-2xl border-[1.5px] border-border bg-white p-5 md:p-8">
            <h3 className="mb-6 font-heading text-[15px] font-semibold text-dark text-center">
              Problemas associados à Apneia Obstrutiva
            </h3>
            <StaggerChildren className="grid grid-cols-3 gap-4 md:gap-6" staggerDelay={0.1} baseDelay={0.2}>
              {risks.map((risk) => (
                <motion.div
                  key={risk.label}
                  variants={staggerItem}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue/15 bg-blue-light transition-all duration-300 hover:scale-110 hover:border-blue/30 hover:shadow-md">
                    <risk.icon className="h-5 w-5 text-blue" />
                  </div>
                  <span className="font-body text-[11px] font-medium text-text-mid leading-tight">
                    {risk.label}
                  </span>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn className="mx-auto max-w-[360px]" delay={0.2}>
          <Button variant="blue" onClick={onStartQuiz}>
            Descubra seu risco agora
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
