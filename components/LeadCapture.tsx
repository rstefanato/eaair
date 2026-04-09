"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { QuizResult } from "@/components/Quiz/quiz-data";

interface LeadCaptureProps {
  quizResult: QuizResult;
  onComplete: (cep: string) => void;
}

export function LeadCapture({ quizResult, onComplete }: LeadCaptureProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  const isStep1Valid = nome.trim().length >= 2 && email.includes("@");
  const isStep2Valid = cep.replace(/\D/g, "").length === 8 && telefone.replace(/\D/g, "").length >= 10;

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return digits;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length > 6) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    if (digits.length > 2) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return digits;
  };

  const handleStep1 = () => { if (isStep1Valid) setStep(2); };

  const handleStep2 = async () => {
    if (!isStep2Valid) return;
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome, email,
          telefone: telefone.replace(/\D/g, ""),
          cep: cep.replace(/\D/g, ""),
          quiz_score: quizResult.score,
          quiz_risk_level: quizResult.riskLevel,
        }),
      });
    } catch { /* silently fail */ }
    setLoading(false);
    onComplete(cep.replace(/\D/g, ""));
  };

  return (
    <section className="flex flex-1 flex-col bg-white px-5 py-6">
      <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col">
        {/* Step indicator */}
        <div className="mb-5 flex gap-2">
          <span className="h-[3px] flex-1 rounded-full bg-blue" />
          <span className={`h-[3px] flex-1 rounded-full ${step === 2 ? "bg-blue" : "bg-border"}`} />
        </div>

        {step === 1 ? (
          <>
            {/* Copy em cima */}
            <div>
              <h2 className="mb-1 font-heading text-base font-semibold text-dark">Quase lá</h2>
              <p className="font-body text-xs text-text-mid">Informe seus dados para acessar o relatório e encontrar um especialista</p>
            </div>

            {/* Espaco branco entre */}
            <div className="flex-1" />

            {/* Inputs e botao embaixo */}
            <div>
              <div className="space-y-3.5">
                <Input label="Nome" type="text" placeholder="Seu nome completo" autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} />
                <Input label="E-mail" type="email" placeholder="seu@email.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mt-5">
                <Button variant="blue" onClick={handleStep1} disabled={!isStep1Valid}>Continuar</Button>
              </div>
              <p className="mt-2.5 text-center font-body text-[10px] text-text-light">Seus dados estão seguros. Não enviamos spam.</p>
            </div>
          </>
        ) : (
          <>
            {/* Copy em cima */}
            <div>
              <h2 className="mb-1 font-heading text-base font-semibold text-dark">Encontre um especialista</h2>
              <p className="font-body text-xs text-text-mid">Precisamos da sua localização para mostrar dentistas credenciados próximos</p>
            </div>

            {/* Espaco branco entre */}
            <div className="flex-1" />

            {/* Inputs e botao embaixo */}
            <div>
              <div className="space-y-3.5">
                <Input label="CEP" type="text" inputMode="numeric" placeholder="00000-000" autoComplete="postal-code" value={cep} onChange={(e) => setCep(formatCep(e.target.value))} />
                <Input label="Telefone" type="tel" inputMode="numeric" placeholder="(00) 00000-0000" autoComplete="tel" value={telefone} onChange={(e) => setTelefone(formatPhone(e.target.value))} />
              </div>
              <div className="mt-5">
                <Button variant="blue" onClick={handleStep2} disabled={!isStep2Valid || loading}>{loading ? "Enviando..." : "Ver credenciados próximos"}</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
