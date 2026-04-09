"use client";

import { cn } from "@/lib/utils";
import type { RadioQuestion } from "./quiz-data";

interface QuizQuestionProps {
  question: RadioQuestion;
  selectedIndex: number | null;
  onSelect: (index: number, points: number) => void;
}

export function QuizQuestion({ question, selectedIndex, onSelect }: QuizQuestionProps) {
  return (
    <div className="flex flex-1 flex-col justify-between px-5 pb-4 pt-6 md:px-8">
      {/* Pergunta no topo */}
      <div className="mb-auto">
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-blue-light px-2.5 py-1 font-heading text-[10.5px] font-semibold text-blue tracking-wide">
          {question.category}
        </span>

        <h2 className="mb-1.5 font-heading text-[21px] font-semibold leading-[1.3] text-dark tracking-tight">
          {question.question}
        </h2>

        <p className="font-body text-[13px] text-text-mid leading-relaxed">
          {question.hint}
        </p>
      </div>

      {/* Respostas alinhadas embaixo */}
      <div className="flex flex-col gap-2.5 pt-4" role="radiogroup" aria-label={question.question}>
        {question.options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          return (
            <button
              key={opt.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(i, opt.points)}
              className={cn(
                "relative flex min-h-[56px] cursor-pointer items-center gap-3.5 overflow-hidden rounded-[14px] border-[1.5px] px-4 py-4 text-left transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98]",
                isSelected
                  ? "border-blue bg-blue-light shadow-[0_2px_12px_var(--color-blue-glow)]"
                  : "border-border bg-off-white hover:border-blue/30 hover:bg-blue-light"
              )}
            >
              <span className={cn(
                "absolute left-0 top-0 bottom-0 w-0 bg-blue transition-[width] duration-250",
                isSelected && "w-1"
              )} />

              <span className={cn(
                "relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                isSelected
                  ? "border-blue bg-blue shadow-[0_0_0_3px_var(--color-blue-glow)]"
                  : "border-slate-300"
              )}>
                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>

              <div className="relative z-10 flex-1">
                <div className={cn(
                  "font-heading text-[14px] font-medium",
                  isSelected ? "font-semibold text-blue-deep" : "text-text"
                )}>
                  {opt.label}
                </div>
                <div className={cn(
                  "font-body text-[11.5px]",
                  isSelected ? "text-text-mid" : "text-text-light"
                )}>
                  {opt.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
