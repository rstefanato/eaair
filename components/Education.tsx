"use client";

import { Button } from "@/components/ui/Button";
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
        <div className="mb-10 text-center md:mb-14">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue">
            Entenda o Problema
          </span>
          <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight md:text-[30px]">
            Ronco e Apneia Obstrutiva do Sono
          </h2>
          <p className="mx-auto max-w-[480px] font-body text-sm text-text-mid leading-relaxed">
            O ronco é ruim, mas a apneia impacta diretamente a saúde do paciente.
          </p>
        </div>

        {/* Impact stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:gap-6">
          <div className="rounded-2xl border-[1.5px] border-border bg-white p-5 text-center">
            <div className="mb-1 font-heading text-[28px] font-semibold text-blue tracking-tight">40%</div>
            <p className="font-body text-xs text-text-mid">das pessoas roncam</p>
          </div>
          <div className="rounded-2xl border-[1.5px] border-border bg-white p-5 text-center">
            <div className="mb-1 font-heading text-[28px] font-semibold text-red tracking-tight">33%</div>
            <p className="font-body text-xs text-text-mid">apresentam apneia</p>
          </div>
        </div>

        {/* Info cards */}
        <div className="mb-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border-[1.5px] border-border bg-white p-5 transition-shadow hover:shadow-md md:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-light">
                <card.icon className="h-5 w-5 text-blue" />
              </div>
              <h3 className="mb-2 font-heading text-[15px] font-semibold text-dark">
                {card.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed text-text-mid">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Risks — circular layout inspired by infographic */}
        <div className="mb-10 rounded-2xl border-[1.5px] border-border bg-white p-5 md:p-8">
          <h3 className="mb-6 font-heading text-[15px] font-semibold text-dark text-center">
            Problemas associados à Apneia Obstrutiva
          </h3>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {risks.map((risk) => (
              <div key={risk.label} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue/15 bg-blue-light">
                  <risk.icon className="h-5 w-5 text-blue" />
                </div>
                <span className="font-body text-[11px] font-medium text-text-mid leading-tight">
                  {risk.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-[360px]">
          <Button variant="blue" onClick={onStartQuiz}>
            Descubra seu risco agora
          </Button>
        </div>
      </div>
    </section>
  );
}
