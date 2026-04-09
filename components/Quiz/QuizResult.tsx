"use client";

import { Button } from "@/components/ui/Button";
import { AlertTriangle, CheckCircle, Info, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizResult as QuizResultType } from "./quiz-data";

interface QuizResultProps {
  result: QuizResultType;
  onContinue: () => void;
}

const riskIcons = { low: CheckCircle, moderate: Info, high: AlertTriangle };
const riskIconBg = { low: "bg-green/10", moderate: "bg-orange/10", high: "bg-red-bg" };

export function QuizResult({ result, onContinue }: QuizResultProps) {
  const Icon = riskIcons[result.riskLevel];

  return (
    <div className="flex flex-1 flex-col items-center px-5 py-8 text-center" aria-live="polite">
      <div className={cn("relative mb-4 flex h-16 w-16 items-center justify-center rounded-full", riskIconBg[result.riskLevel])}>
        <Icon className="h-[26px] w-[26px]" style={{ color: result.riskColor }} />
        <span
          className="absolute -inset-1.5 animate-[ring-pulse_2s_ease-in-out_infinite] rounded-full border-2"
          style={{ borderColor: `${result.riskColor}20` }}
        />
      </div>

      <p className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[2px]" style={{ color: result.riskColor }}>
        {result.riskLabel}
      </p>

      <h2 className="mb-2 font-heading text-[22px] font-semibold text-dark tracking-tight">
        {result.riskTitle}
      </h2>

      <p className="mb-5 max-w-[260px] font-body text-[13px] leading-relaxed text-text-mid">
        Seus indicadores sugerem que uma avaliacao profissional e recomendada para entender melhor sua situacao.
      </p>

      <div className="mb-6 w-full max-w-[240px]">
        <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange to-red transition-[width] duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ width: `${result.percentage}%` }}
          />
        </div>
        <div className="flex justify-between font-body text-[9px] font-medium uppercase tracking-[1px]">
          <span className="text-green">Baixo</span>
          <span className="text-red">Alto</span>
        </div>
      </div>

      <div className="mb-4 w-full rounded-[14px] border-[1.5px] border-dashed border-slate-300 bg-off-white p-4 text-left">
        <div className="mb-2.5 flex items-center gap-[7px] font-heading text-[13px] font-semibold text-dark">
          <Lock className="h-3.5 w-3.5 text-text-light" />
          Seu relatorio completo inclui
        </div>
        {["Analise detalhada dos seus fatores de risco", "Recomendacoes personalizadas", "Dentista credenciado perto de voce"].map((item) => (
          <div key={item} className="flex items-center gap-2 py-1 font-body text-xs text-text-mid">
            <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" />
            {item}
          </div>
        ))}
      </div>

      <Button variant="blue" onClick={onContinue} className="w-full">
        Ver relatorio completo
      </Button>

      <p className="mt-2.5 font-body text-[10px] text-text-light">
        Seus dados estao seguros e protegidos
      </p>
    </div>
  );
}
