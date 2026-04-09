"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { calculateBmiPoints } from "./quiz-data";
import { ArrowRight } from "lucide-react";

interface QuizBmiQuestionProps {
  onSubmit: (points: number) => void;
}

export function QuizBmiQuestion({ onSubmit }: QuizBmiQuestionProps) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const isValid =
    weight !== "" &&
    height !== "" &&
    Number(weight) > 20 &&
    Number(weight) < 300 &&
    Number(height) > 80 &&
    Number(height) < 250;

  const handleSubmit = () => {
    if (!isValid) return;
    const points = calculateBmiPoints(Number(weight), Number(height));
    onSubmit(points);
  };

  return (
    <div className="flex flex-1 flex-col justify-between px-5 pb-4 pt-6 md:px-8">
      {/* Pergunta no topo */}
      <div className="mb-auto">
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-blue-light px-2.5 py-1 font-heading text-[10.5px] font-semibold text-blue tracking-wide">
          IMC
        </span>

        <h2 className="mb-1.5 font-heading text-[21px] font-semibold leading-[1.3] text-dark tracking-tight">
          Qual seu peso e altura?
        </h2>

        <p className="font-body text-[13px] text-text-mid leading-relaxed">
          Usamos esses dados para avaliar um dos fatores de risco. Nenhum cálculo será exibido.
        </p>
      </div>

      {/* Inputs alinhados embaixo */}
      <div className="flex gap-3 pt-4">
        <div className="flex-1">
          <Input
            label="Peso (kg)"
            type="number"
            inputMode="decimal"
            placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="flex-1">
          <Input
            label="Altura (cm)"
            type="number"
            inputMode="numeric"
            placeholder="170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button variant="blue" onClick={handleSubmit} disabled={!isValid}>
          Continuar
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
