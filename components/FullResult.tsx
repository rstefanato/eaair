import { CheckCircle, Shield, Smile } from "lucide-react";
import type { QuizResult } from "@/components/Quiz/quiz-data";

interface FullResultProps {
  result: QuizResult;
}

const benefits = [
  { icon: CheckCircle, title: "Melhora na Qualidade do Sono", description: "Reduz o ronco e interrupcoes respiratorias, garantindo noites mais tranquilas e reparadoras." },
  { icon: Shield, title: "Saude Respiratoria", description: "Melhora a oxigenacao e ajuda a prevenir complicacoes como hipertensao e doencas cardiovasculares." },
  { icon: Smile, title: "Conforto e Discricao", description: "Design estetico, confortavel e discreto que se adapta a rotina noturna." },
];

export function FullResult({ result }: FullResultProps) {
  return (
    <section className="bg-off-white px-5 py-12">
      <div className="mx-auto max-w-[600px]">
        <div className="mb-8 rounded-2xl border-[1.5px] border-border bg-white p-5 md:p-6">
          <h2 className="mb-4 font-heading text-lg font-semibold text-dark">Seu Relatorio Completo</h2>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${result.riskColor}15` }}>
              <span className="font-heading text-sm font-bold" style={{ color: result.riskColor }}>{result.score}</span>
            </div>
            <div>
              <p className="font-heading text-xs font-semibold uppercase tracking-wider" style={{ color: result.riskColor }}>{result.riskLabel}</p>
              <p className="font-body text-xs text-text-mid">{result.score} de {result.maxScore} pontos no STOP-Bang adaptado</p>
            </div>
          </div>
          <p className="font-body text-[13px] leading-relaxed text-text-mid">
            {result.riskLevel === "high"
              ? "Seus indicadores sugerem risco elevado de Apneia Obstrutiva do Sono. Recomendamos fortemente que voce procure um profissional credenciado para avaliacao."
              : result.riskLevel === "moderate"
                ? "Seus indicadores apontam risco moderado. E recomendavel uma avaliacao profissional para entender melhor sua situacao."
                : "Seus indicadores estao dentro da normalidade, mas se voce tem sintomas frequentes, vale consultar um profissional."}
          </p>
        </div>

        <div className="mb-6 text-center">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue">A Solucao</span>
          <h2 className="mb-2 font-heading text-[22px] font-semibold text-dark tracking-tight">Esthetic Aligner AIR</h2>
          <p className="mx-auto max-w-[400px] font-body text-sm leading-relaxed text-text-mid">
            Uma solucao confortavel e acessivel para ronco e apneia. O EA Air ajuda a reduzir o ronco e as interrupcoes respiratorias, promovendo um sono profundo e reparador.
          </p>
        </div>

        <div className="space-y-3">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4 rounded-2xl border-[1.5px] border-border bg-white p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-light">
                <b.icon className="h-5 w-5 text-blue" />
              </div>
              <div>
                <h3 className="mb-0.5 font-heading text-[14px] font-semibold text-dark">{b.title}</h3>
                <p className="font-body text-[12.5px] leading-relaxed text-text-mid">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-body text-sm text-text-mid">O proximo passo e consultar um especialista credenciado perto de voce.</p>
      </div>
    </section>
  );
}
