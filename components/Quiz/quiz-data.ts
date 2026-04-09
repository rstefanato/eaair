export type QuestionType = "radio" | "bmi";

export interface RadioOption {
  label: string;
  description: string;
  points: number;
}

export interface RadioQuestion {
  type: "radio";
  id: string;
  category: string;
  categoryIcon: string;
  question: string;
  hint: string;
  options: RadioOption[];
}

export interface BmiQuestion {
  type: "bmi";
  id: string;
  category: string;
  categoryIcon: string;
  question: string;
  hint: string;
}

export type Question = RadioQuestion | BmiQuestion;

export type RiskLevel = "low" | "moderate" | "high";

export interface QuizResult {
  score: number;
  maxScore: number;
  percentage: number;
  riskLevel: RiskLevel;
  riskLabel: string;
  riskTitle: string;
  riskColor: string;
}

export const questions: Question[] = [
  {
    type: "radio",
    id: "ronco",
    category: "Ronco",
    categoryIcon: "volume-2",
    question: "Voce ronca ou ja disseram que voce ronca?",
    hint: "Considere o que parceiro(a), familiares ou amigos ja comentaram.",
    options: [
      { label: "Sim", description: "Ronco com frequencia", points: 2 },
      { label: "Nao", description: "Nunca roncei ou me disseram", points: 0 },
      { label: "Nao sei", description: "Nunca me falaram sobre isso", points: 1 },
    ],
  },
  {
    type: "radio",
    id: "observacao",
    category: "Observacao",
    categoryIcon: "eye",
    question: "Alguem ja percebeu que voce para de respirar ou engasga enquanto dorme?",
    hint: "Parceiro(a), familiar ou amigo que tenha dormido no mesmo ambiente.",
    options: [
      { label: "Sim, ja me disseram", description: "Alguem observou paradas ou engasgos", points: 2 },
      { label: "Nao", description: "Ja perguntei e ninguem notou", points: 0 },
      { label: "Nao sei", description: "Nunca perguntei ou durmo sozinho(a)", points: 1 },
    ],
  },
  {
    type: "radio",
    id: "cansaco",
    category: "Cansaco",
    categoryIcon: "battery-low",
    question: "Voce se sente cansado(a) ou com sono durante o dia, mesmo dormindo a noite toda?",
    hint: "Pense nos ultimos 30 dias.",
    options: [
      { label: "Sempre", description: "Praticamente todos os dias", points: 2 },
      { label: "As vezes", description: "Alguns dias na semana", points: 1 },
      { label: "Raramente", description: "Quase nunca me sinto assim", points: 0 },
    ],
  },
  {
    type: "bmi",
    id: "imc",
    category: "IMC",
    categoryIcon: "scale",
    question: "Qual seu peso e altura?",
    hint: "Usamos esses dados para avaliar um dos fatores de risco. Nenhum calculo sera exibido.",
  },
  {
    type: "radio",
    id: "sintomas",
    category: "Sintomas",
    categoryIcon: "sun",
    question: "Com que frequencia voce acorda com dor de cabeca ou boca seca?",
    hint: "Sintomas ao acordar pela manha.",
    options: [
      { label: "Frequentemente", description: "3 ou mais vezes por semana", points: 2 },
      { label: "As vezes", description: "1-2 vezes por semana", points: 1 },
      { label: "Nunca", description: "Nao tenho esses sintomas", points: 0 },
    ],
  },
  {
    type: "radio",
    id: "pressao",
    category: "Pressao",
    categoryIcon: "heart-pulse",
    question: "Voce tem ou esta tratando pressao alta?",
    hint: "Hipertensao diagnosticada ou uso de medicacao.",
    options: [
      { label: "Sim", description: "Tenho diagnostico ou tomo medicacao", points: 2 },
      { label: "Nao", description: "Minha pressao e normal", points: 0 },
      { label: "Nao sei", description: "Nunca medi ou nao lembro", points: 1 },
    ],
  },
];

export function calculateBmiPoints(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  if (bmi >= 28) return 2;
  if (bmi >= 25) return 1;
  return 0;
}

export function calculateResult(answers: Record<string, number>): QuizResult {
  const score = Object.values(answers).reduce((sum, pts) => sum + pts, 0);
  const maxScore = 12;
  const percentage = Math.round((score / maxScore) * 100);

  let riskLevel: RiskLevel;
  let riskLabel: string;
  let riskTitle: string;
  let riskColor: string;

  if (score <= 3) {
    riskLevel = "low";
    riskLabel = "Risco Baixo";
    riskTitle = "Boas indicacoes";
    riskColor = "#16A34A";
  } else if (score <= 7) {
    riskLevel = "moderate";
    riskLabel = "Risco Moderado";
    riskTitle = "Fique atento";
    riskColor = "#F97316";
  } else {
    riskLevel = "high";
    riskLabel = "Risco Alto";
    riskTitle = "Atencao aos sinais";
    riskColor = "#DC2626";
  }

  return { score, maxScore, percentage, riskLevel, riskLabel, riskTitle, riskColor };
}
