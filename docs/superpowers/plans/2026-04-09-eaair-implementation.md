# EA Air Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the EA Air landing page with STOP-Bang quiz funnel, progressive lead capture, and credentialed dentist list.

**Architecture:** Next.js App Router single-page app. Quiz state managed in React. Lead capture via Server Action writing to JSON. Credentialed list from static JSON filtered by CEP prefix. All sections render on one page with smooth scroll navigation.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS 4, Framer Motion, Lucide React, Plus Jakarta Sans + DM Sans (Google Fonts)

**Design Spec:** `docs/superpowers/specs/2026-04-09-eaair-redesign-design.md`

**Hi-Fi Mockups:** `.superpowers/brainstorm/39231-1775742044/content/hifi-hero-quiz-v2.html`

---

## File Structure

```
app/
  layout.tsx              Root layout: fonts, metadata, viewport
  page.tsx                Landing page composing all sections
  globals.css             Tailwind directives + CSS custom properties
  api/
    lead/
      route.ts            POST handler: save lead to JSON file
components/
  Hero.tsx                Hero section with background effects and CTAs
  Education.tsx           Mini-educativo: apnea info cards + risks
  Quiz/
    quiz-data.ts          Questions array, scoring logic, types
    Quiz.tsx              Quiz container: state machine, orchestrates flow
    QuizQuestion.tsx      Single question with radio options
    QuizBmiQuestion.tsx   Question 4: weight/height inputs for IMC
    QuizProgress.tsx      Progress bar with gradient and dot
    QuizResult.tsx        Partial result: risk level + locked content
  LeadCapture.tsx         Progressive 2-step form
  FullResult.tsx          Complete report + EA Air product showcase
  Credentialed/
    credentialed-data.ts  Types + CEP matching logic
    CredentialedList.tsx  List container with filtering
    CredentialedCard.tsx  Individual dentist card
  Footer.tsx              Footer with logo and links
  ui/
    Button.tsx            Reusable button (primary/ghost/secondary variants)
    Input.tsx             Reusable input with label and validation
data/
  credenciados.json       Static dentist data for MVP
lib/
  utils.ts                cn() helper for Tailwind class merging
public/
  images/
    ea-logo.png           (already exists)
```

---

### Task 1: Project Scaffold + Design System

**Files:**
- Create: `package.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `tsconfig.json`, `lib/utils.ts`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /c/Users/alvar/documents/projetos/eeair
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias="@/*" --use-npm
```

Accept overwriting existing files if prompted. Select defaults for all options.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

- [ ] **Step 3: Create `lib/utils.ts`**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Configure `app/globals.css` with design tokens**

Replace the entire file:

```css
@import "tailwindcss";

@theme {
  --color-blue: #1863DC;
  --color-blue-deep: #0F4CAF;
  --color-blue-light: #EBF2FD;
  --color-blue-glow: rgba(24, 99, 220, 0.15);
  --color-orange: #F97316;
  --color-orange-glow: rgba(249, 115, 22, 0.2);
  --color-dark: #0F1729;
  --color-text: #1E293B;
  --color-text-mid: #64748B;
  --color-text-light: #94A3B8;
  --color-off-white: #F8FAFC;
  --color-border: #E2E8F0;
  --color-green: #16A34A;
  --color-red: #DC2626;
  --color-red-bg: #FEF2F2;

  --font-heading: "Plus Jakarta Sans", sans-serif;
  --font-body: "DM Sans", sans-serif;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Configure `app/layout.tsx` with fonts and metadata**

Replace the entire file:

```tsx
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "EA Air — Teste de Apneia do Sono",
  description:
    "Descubra em 2 minutos se voce tem risco de apneia obstrutiva do sono. Teste gratuito baseado no STOP-Bang e encontre um dentista credenciado perto de voce.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <body className="font-body text-text bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Create minimal `app/page.tsx` shell**

```tsx
export default function Home() {
  return (
    <main>
      <section id="hero" className="min-h-screen">
        <p className="p-8 font-heading text-2xl font-semibold text-dark">
          EA Air — Em construcao
        </p>
      </section>
    </main>
  );
}
```

- [ ] **Step 7: Run dev server and verify**

```bash
npm run dev
```

Open http://localhost:3000. Verify: text renders in Plus Jakarta Sans, no console errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with design system tokens"
```

---

### Task 2: Reusable UI Components (Button + Input)

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Input.tsx`

- [ ] **Step 1: Create `components/ui/Button.tsx`**

```tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "ghost" | "secondary" | "blue";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-orange text-white shadow-[0_4px_14px_var(--color-orange-glow)] hover:shadow-[0_6px_24px_rgba(249,115,22,0.3)] active:scale-[0.98]",
  ghost:
    "bg-white/[0.04] text-white/80 border border-white/[0.08] backdrop-blur-sm hover:bg-white/10 hover:border-white/20",
  secondary:
    "bg-blue-light text-blue hover:bg-blue/10 active:scale-[0.98]",
  blue:
    "bg-blue text-white shadow-[0_4px_14px_var(--color-blue-glow)] hover:shadow-[0_6px_24px_rgba(24,99,220,0.25)] active:scale-[0.98]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative flex w-full items-center justify-center gap-2 rounded-[13px] px-5 py-4 font-heading text-[14.5px] font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
```

- [ ] **Step 2: Create `components/ui/Input.tsx`**

```tsx
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-text"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-[10px] border-[1.5px] border-border bg-off-white px-3 py-3.5 font-body text-sm text-text placeholder:text-text-light transition-colors duration-200 focus:border-blue focus:bg-white focus:outline-none",
            error && "border-red",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/
git commit -m "feat: add Button and Input UI components"
```

---

### Task 3: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToEducation = () => {
    document.getElementById("educacao")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 30% 100%, rgba(24,99,220,0.7) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 15%, rgba(99,102,241,0.4) 0%, transparent 50%), linear-gradient(175deg, #070D1A 0%, #0B1632 25%, #0F1E42 50%, #0C1735 75%, #08102A 100%)",
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.025] bg-[length:200px] bg-repeat" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Glow orbs */}
      <div className="absolute -top-10 -right-8 h-[180px] w-[180px] rounded-full bg-blue/15 blur-[50px] animate-[drift_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-24 -left-5 h-[120px] w-[120px] rounded-full bg-indigo-500/12 blur-[50px] animate-[drift_10s_ease-in-out_infinite_-4s]" />

      {/* Dot grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[600px] flex-col px-5 pb-6 pt-14 md:items-center md:justify-center md:pt-20 md:text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2.5 md:justify-center">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-white/95 shadow-lg">
            <span className="font-heading text-xs font-extrabold text-blue tracking-tight">EA</span>
          </div>
          <span className="font-heading text-[15px] font-medium text-white/85 tracking-wide">EA Air</span>
        </div>

        {/* Badge */}
        <div className="mb-5 flex items-center gap-[7px] self-start rounded-full border border-white/[0.08] bg-white/[0.06] px-3.5 py-[7px] backdrop-blur-xl md:self-center">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.4)] animate-pulse" />
          <span className="font-body text-[11.5px] text-white/60">
            Teste gratuito em 2 min
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-3.5 font-heading text-[27px] font-semibold leading-[1.2] text-white/95 tracking-tight md:text-[36px]">
          Uma boa noite de sono muda{" "}
          <span className="bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            tudo.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-8 max-w-[260px] font-body text-sm font-light leading-relaxed text-white/45 md:max-w-[380px] md:text-base">
          Descubra se voce tem sinais de apneia obstrutiva do sono com nosso
          teste rapido e gratuito.
        </p>

        {/* CTAs */}
        <div className="mt-auto flex w-full flex-col gap-2.5 md:mt-0 md:max-w-[380px]">
          <Button variant="primary" onClick={scrollToQuiz}>
            Fazer o teste agora
            <ArrowRight className="h-[15px] w-[15px]" />
          </Button>
          <Button variant="ghost" onClick={scrollToEducation}>
            <ChevronDown className="h-[13px] w-[13px] opacity-50" />
            Saiba mais sobre apneia
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-4 grid w-full grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/[0.04] md:max-w-[380px]">
          {[
            { value: "1 em 3", label: "pessoas tem apneia" },
            { value: "80%", label: "nao sabem que tem" },
            { value: "2 min", label: "para descobrir" },
          ].map((stat) => (
            <div key={stat.value} className="bg-white/[0.02] px-1.5 py-3 text-center">
              <div className="font-heading text-[17px] font-semibold text-white/90 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-0.5 font-body text-[10px] text-white/30 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add drift keyframe to `globals.css`**

Append at the end of `globals.css`:

```css
@keyframes drift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(8px, -12px); }
  50% { transform: translate(-5px, 8px); }
  75% { transform: translate(6px, 5px); }
}
```

- [ ] **Step 3: Update `app/page.tsx` to render Hero**

```tsx
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Run dev server and verify Hero renders**

```bash
npm run dev
```

Check http://localhost:3000 — Hero should render with gradient background, title, CTAs, stats.

- [ ] **Step 5: Commit**

```bash
git add app/ components/Hero.tsx
git commit -m "feat: add Hero section with background effects and CTAs"
```

---

### Task 4: Education Section

**Files:**
- Create: `components/Education.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Education.tsx`**

```tsx
"use client";

import { Button } from "@/components/ui/Button";
import { Moon, AlertTriangle, Activity, HeartPulse, Brain, Zap } from "lucide-react";

const risks = [
  "Hipertensao Arterial",
  "Doencas Cardiovasculares",
  "AVC (Acidente Vascular Cerebral)",
  "Diabetes Tipo 2",
  "Disturbios do Humor",
  "Risco de Acidentes",
];

const cards = [
  {
    icon: Moon,
    title: "O que e Apneia?",
    description:
      "A Apneia Obstrutiva do Sono (AOS) ocorre quando ha interrupcoes na respiracao durante o sono, causando despertares e reducao do oxigenio no sangue.",
  },
  {
    icon: AlertTriangle,
    title: "Sinais de Alerta",
    description:
      "Ronco alto, cansaco diurno excessivo, dor de cabeca matinal, boca seca ao acordar e dificuldade de concentracao.",
  },
  {
    icon: Activity,
    title: "Quem tem Risco?",
    description:
      "Presente em 1 a cada 3 pessoas. Fatores: sobrepeso, circunferencia do pescoco elevada, idade acima de 50 anos e historico familiar.",
  },
];

export function Education() {
  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

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
            O ronco pode ser mais do que um incomodo: pode ser um sinal de um
            disturbio que compromete sua saude e qualidade de vida.
          </p>
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

        {/* Risks */}
        <div className="mb-10 rounded-2xl border-[1.5px] border-border bg-white p-5 md:p-8">
          <h3 className="mb-4 font-heading text-[15px] font-semibold text-dark md:text-center">
            Problemas associados a Apneia
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3">
            {risks.map((risk, i) => (
              <div key={risk} className="flex items-center gap-2.5 py-1.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-bg font-heading text-[10px] font-semibold text-red">
                  {i + 1}
                </span>
                <span className="font-body text-[12.5px] text-text-mid">
                  {risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-[360px]">
          <Button variant="blue" onClick={scrollToQuiz}>
            Descubra seu risco agora
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Education to `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";

export default function Home() {
  return (
    <main>
      <Hero />
      <Education />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser, commit**

```bash
npm run dev
```

Check scroll from Hero to Education works. Then:

```bash
git add components/Education.tsx app/page.tsx
git commit -m "feat: add Education section with apnea info and risk cards"
```

---

### Task 5: Quiz Data Model + Scoring Logic

**Files:**
- Create: `components/Quiz/quiz-data.ts`

- [ ] **Step 1: Create `components/Quiz/quiz-data.ts`**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/Quiz/quiz-data.ts
git commit -m "feat: add quiz data model, questions, and scoring logic"
```

---

### Task 6: Quiz UI Components

**Files:**
- Create: `components/Quiz/QuizProgress.tsx`, `components/Quiz/QuizQuestion.tsx`, `components/Quiz/QuizBmiQuestion.tsx`, `components/Quiz/QuizResult.tsx`, `components/Quiz/Quiz.tsx`

- [ ] **Step 1: Create `components/Quiz/QuizProgress.tsx`**

```tsx
interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="h-[3px] bg-slate-100" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      <div
        className="relative h-full rounded-r-sm bg-gradient-to-r from-blue to-indigo-400 transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ width: `${percentage}%` }}
      >
        <span className="absolute -right-1 top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-blue shadow-[0_0_0_3px_var(--color-blue-glow)]" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/Quiz/QuizQuestion.tsx`**

```tsx
"use client";

import { cn } from "@/lib/utils";
import type { RadioQuestion } from "./quiz-data";

interface QuizQuestionProps {
  question: RadioQuestion;
  selectedIndex: number | null;
  onSelect: (points: number) => void;
}

export function QuizQuestion({ question, selectedIndex, onSelect }: QuizQuestionProps) {
  return (
    <div className="flex flex-1 flex-col px-5 pb-4 pt-6 md:px-8">
      <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-blue-light px-2.5 py-1 font-heading text-[10.5px] font-semibold text-blue tracking-wide">
        {question.category}
      </span>

      <h2 className="mb-1.5 font-heading text-[21px] font-semibold leading-[1.3] text-dark tracking-tight">
        {question.question}
      </h2>

      <p className="mb-6 font-body text-[13px] text-text-mid leading-relaxed">
        {question.hint}
      </p>

      <div className="flex flex-col gap-2.5" role="radiogroup" aria-label={question.question}>
        {question.options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          return (
            <button
              key={opt.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(opt.points)}
              className={cn(
                "relative flex min-h-[56px] cursor-pointer items-center gap-3.5 overflow-hidden rounded-[14px] border-[1.5px] px-4 py-4 text-left transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98]",
                isSelected
                  ? "border-blue bg-blue-light shadow-[0_2px_12px_var(--color-blue-glow)]"
                  : "border-border bg-off-white hover:border-blue/30 hover:bg-blue-light"
              )}
            >
              {/* Left accent bar */}
              <span
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-0 bg-blue transition-[width] duration-250",
                  isSelected && "w-1"
                )}
              />

              {/* Radio circle */}
              <span
                className={cn(
                  "relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                  isSelected
                    ? "border-blue bg-blue shadow-[0_0_0_3px_var(--color-blue-glow)]"
                    : "border-slate-300"
                )}
              >
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>

              {/* Text */}
              <div className="relative z-10 flex-1">
                <div
                  className={cn(
                    "font-heading text-[14px] font-medium",
                    isSelected ? "font-semibold text-blue-deep" : "text-text"
                  )}
                >
                  {opt.label}
                </div>
                <div
                  className={cn(
                    "font-body text-[11.5px]",
                    isSelected ? "text-text-mid" : "text-text-light"
                  )}
                >
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
```

- [ ] **Step 3: Create `components/Quiz/QuizBmiQuestion.tsx`**

```tsx
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
    <div className="flex flex-1 flex-col px-5 pb-4 pt-6 md:px-8">
      <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-blue-light px-2.5 py-1 font-heading text-[10.5px] font-semibold text-blue tracking-wide">
        IMC
      </span>

      <h2 className="mb-1.5 font-heading text-[21px] font-semibold leading-[1.3] text-dark tracking-tight">
        Qual seu peso e altura?
      </h2>

      <p className="mb-6 font-body text-[13px] text-text-mid leading-relaxed">
        Usamos esses dados para avaliar um dos fatores de risco. Nenhum calculo sera exibido.
      </p>

      <div className="flex gap-3">
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
```

- [ ] **Step 4: Create `components/Quiz/QuizResult.tsx`**

```tsx
"use client";

import { Button } from "@/components/ui/Button";
import { AlertTriangle, CheckCircle, Info, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizResult as QuizResultType } from "./quiz-data";

interface QuizResultProps {
  result: QuizResultType;
  onContinue: () => void;
}

const riskIcons = {
  low: CheckCircle,
  moderate: Info,
  high: AlertTriangle,
};

const riskIconBg = {
  low: "bg-green/10",
  moderate: "bg-orange/10",
  high: "bg-red-bg",
};

export function QuizResult({ result, onContinue }: QuizResultProps) {
  const Icon = riskIcons[result.riskLevel];

  return (
    <div className="flex flex-1 flex-col items-center px-5 py-8 text-center" aria-live="polite">
      {/* Icon */}
      <div className={cn("relative mb-4 flex h-16 w-16 items-center justify-center rounded-full", riskIconBg[result.riskLevel])}>
        <Icon className="h-[26px] w-[26px]" style={{ color: result.riskColor }} />
        <span
          className="absolute -inset-1.5 animate-[ring-pulse_2s_ease-in-out_infinite] rounded-full border-2"
          style={{ borderColor: `${result.riskColor}20` }}
        />
      </div>

      {/* Level */}
      <p
        className="mb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[2px]"
        style={{ color: result.riskColor }}
      >
        {result.riskLabel}
      </p>

      <h2 className="mb-2 font-heading text-[22px] font-semibold text-dark tracking-tight">
        {result.riskTitle}
      </h2>

      <p className="mb-5 max-w-[260px] font-body text-[13px] leading-relaxed text-text-mid">
        Seus indicadores sugerem que uma avaliacao profissional e recomendada
        para entender melhor sua situacao.
      </p>

      {/* Risk bar */}
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

      {/* Locked content */}
      <div className="mb-4 w-full rounded-[14px] border-[1.5px] border-dashed border-slate-300 bg-off-white p-4 text-left">
        <div className="mb-2.5 flex items-center gap-[7px] font-heading text-[13px] font-semibold text-dark">
          <Lock className="h-3.5 w-3.5 text-text-light" />
          Seu relatorio completo inclui
        </div>
        {[
          "Analise detalhada dos seus fatores de risco",
          "Recomendacoes personalizadas",
          "Dentista credenciado perto de voce",
        ].map((item) => (
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
```

- [ ] **Step 5: Create `components/Quiz/Quiz.tsx` — main container**

```tsx
"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { questions, calculateResult, type QuizResult as QuizResultType } from "./quiz-data";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizBmiQuestion } from "./QuizBmiQuestion";
import { QuizResult } from "./QuizResult";

type QuizPhase = "questions" | "result";

interface QuizProps {
  onComplete: (result: QuizResultType) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [phase, setPhase] = useState<QuizPhase>("questions");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [result, setResult] = useState<QuizResultType | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

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

  const handleResultContinue = () => {
    if (result) onComplete(result);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="quiz" className="bg-white">
      <div className="mx-auto max-w-[600px]">
        {phase === "questions" && (
          <>
            {/* Topbar */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-2.5">
              <button
                onClick={goBack}
                disabled={currentIndex === 0}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border-[1.5px] border-border text-text-mid transition-colors hover:border-blue hover:text-blue disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-mid cursor-pointer"
                aria-label="Voltar"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <span className="font-heading text-xs font-medium text-text-light tracking-wide">
                <b className="font-semibold text-text">{currentIndex + 1}</b>{" "}
                / {questions.length}
              </span>

              <button
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] text-text-light cursor-pointer"
                aria-label="Fechar"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Progress */}
            <QuizProgress current={currentIndex + 1} total={questions.length} />

            {/* Question with animation */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="flex min-h-[480px] flex-col"
              >
                {currentQuestion.type === "bmi" ? (
                  <QuizBmiQuestion onSubmit={advance} />
                ) : (
                  <QuizQuestion
                    question={currentQuestion}
                    selectedIndex={selectedOptionIndex}
                    onSelect={(points) => {
                      const optIdx = currentQuestion.options.findIndex(
                        (o) => o.points === points
                      );
                      handleRadioSelect(optIdx, points);
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <div className="border-t border-slate-50 px-5 py-3 text-center">
              <p className="font-body text-[11px] text-text-light">
                Toque em uma opcao para avancar
              </p>
            </div>
          </>
        )}

        {phase === "result" && result && (
          <QuizResult result={result} onContinue={handleResultContinue} />
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Add ring-pulse keyframe to `globals.css`**

Append at the end:

```css
@keyframes ring-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.5; }
}
```

- [ ] **Step 7: Commit**

```bash
git add components/Quiz/ app/globals.css
git commit -m "feat: add Quiz UI components with animations and scoring"
```

---

### Task 7: Lead Capture + API Route

**Files:**
- Create: `components/LeadCapture.tsx`, `app/api/lead/route.ts`

- [ ] **Step 1: Create `app/api/lead/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

interface LeadData {
  nome: string;
  email: string;
  telefone?: string;
  cep?: string;
  quiz_score: number;
  quiz_risk_level: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json();

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    // Read existing leads
    let leads: LeadData[] = [];
    try {
      const raw = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(raw);
    } catch {
      // File doesn't exist yet
    }

    // Append new lead
    leads.push({
      ...body,
      timestamp: new Date().toISOString(),
    });

    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Create `components/LeadCapture.tsx`**

```tsx
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

  const handleStep1 = () => {
    if (isStep1Valid) setStep(2);
  };

  const handleStep2 = async () => {
    if (!isStep2Valid) return;
    setLoading(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          telefone: telefone.replace(/\D/g, ""),
          cep: cep.replace(/\D/g, ""),
          quiz_score: quizResult.score,
          quiz_risk_level: quizResult.riskLevel,
        }),
      });
    } catch {
      // Silently fail — don't block the user
    }

    setLoading(false);
    onComplete(cep.replace(/\D/g, ""));
  };

  return (
    <section className="bg-white px-5 py-10">
      <div className="mx-auto max-w-[400px]">
        {/* Step indicator */}
        <div className="mb-5 flex gap-2">
          <span className="h-[3px] flex-1 rounded-full bg-blue" />
          <span className={`h-[3px] flex-1 rounded-full ${step === 2 ? "bg-blue" : "bg-border"}`} />
        </div>

        {step === 1 ? (
          <>
            <h2 className="mb-1 font-heading text-base font-semibold text-dark">
              Quase la
            </h2>
            <p className="mb-5 font-body text-xs text-text-mid">
              Informe seus dados para acessar o relatorio e encontrar um especialista
            </p>

            <div className="space-y-3.5">
              <Input
                label="Nome"
                type="text"
                placeholder="Seu nome completo"
                autoComplete="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <Button variant="blue" onClick={handleStep1} disabled={!isStep1Valid}>
                Continuar
              </Button>
            </div>
            <p className="mt-2.5 text-center font-body text-[10px] text-text-light">
              Seus dados estao seguros. Nao enviamos spam.
            </p>
          </>
        ) : (
          <>
            <h2 className="mb-1 font-heading text-base font-semibold text-dark">
              Encontre um especialista
            </h2>
            <p className="mb-5 font-body text-xs text-text-mid">
              Precisamos da sua localizacao para mostrar dentistas credenciados proximos
            </p>

            <div className="space-y-3.5">
              <Input
                label="CEP"
                type="text"
                inputMode="numeric"
                placeholder="00000-000"
                autoComplete="postal-code"
                value={cep}
                onChange={(e) => setCep(formatCep(e.target.value))}
              />
              <Input
                label="Telefone"
                type="tel"
                inputMode="numeric"
                placeholder="(00) 00000-0000"
                autoComplete="tel"
                value={telefone}
                onChange={(e) => setTelefone(formatPhone(e.target.value))}
              />
            </div>

            <div className="mt-5">
              <Button variant="blue" onClick={handleStep2} disabled={!isStep2Valid || loading}>
                {loading ? "Enviando..." : "Ver credenciados proximos"}
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/LeadCapture.tsx app/api/lead/route.ts
git commit -m "feat: add progressive lead capture form and API route"
```

---

### Task 8: Full Result + EA Air Product Section

**Files:**
- Create: `components/FullResult.tsx`

- [ ] **Step 1: Create `components/FullResult.tsx`**

```tsx
import { CheckCircle, Shield, Smile } from "lucide-react";
import type { QuizResult } from "@/components/Quiz/quiz-data";
import Image from "next/image";

interface FullResultProps {
  result: QuizResult;
}

const benefits = [
  {
    icon: CheckCircle,
    title: "Melhora na Qualidade do Sono",
    description: "Reduz o ronco e interrupcoes respiratorias, garantindo noites mais tranquilas e reparadoras.",
  },
  {
    icon: Shield,
    title: "Saude Respiratoria",
    description: "Melhora a oxigenacao e ajuda a prevenir complicacoes como hipertensao e doencas cardiovasculares.",
  },
  {
    icon: Smile,
    title: "Conforto e Discricao",
    description: "Design estetico, confortavel e discreto que se adapta a rotina noturna.",
  },
];

export function FullResult({ result }: FullResultProps) {
  return (
    <section className="bg-off-white px-5 py-12">
      <div className="mx-auto max-w-[600px]">
        {/* Result summary */}
        <div className="mb-8 rounded-2xl border-[1.5px] border-border bg-white p-5 md:p-6">
          <h2 className="mb-4 font-heading text-lg font-semibold text-dark">
            Seu Relatorio Completo
          </h2>
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: `${result.riskColor}15` }}
            >
              <span
                className="font-heading text-sm font-bold"
                style={{ color: result.riskColor }}
              >
                {result.score}
              </span>
            </div>
            <div>
              <p
                className="font-heading text-xs font-semibold uppercase tracking-wider"
                style={{ color: result.riskColor }}
              >
                {result.riskLabel}
              </p>
              <p className="font-body text-xs text-text-mid">
                {result.score} de {result.maxScore} pontos no STOP-Bang adaptado
              </p>
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

        {/* EA Air product */}
        <div className="mb-6 text-center">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue">
            A Solucao
          </span>
          <h2 className="mb-2 font-heading text-[22px] font-semibold text-dark tracking-tight">
            Esthetic Aligner AIR
          </h2>
          <p className="mx-auto max-w-[400px] font-body text-sm leading-relaxed text-text-mid">
            Uma solucao confortavel e acessivel para ronco e apneia. O EA Air
            ajuda a reduzir o ronco e as interrupcoes respiratorias, promovendo
            um sono profundo e reparador.
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex gap-4 rounded-2xl border-[1.5px] border-border bg-white p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-light">
                <b.icon className="h-5 w-5 text-blue" />
              </div>
              <div>
                <h3 className="mb-0.5 font-heading text-[14px] font-semibold text-dark">
                  {b.title}
                </h3>
                <p className="font-body text-[12.5px] leading-relaxed text-text-mid">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition text */}
        <p className="mt-8 text-center font-body text-sm text-text-mid">
          O proximo passo e consultar um especialista credenciado perto de voce.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/FullResult.tsx
git commit -m "feat: add full result report and EA Air product section"
```

---

### Task 9: Credentialed Dentist List

**Files:**
- Create: `data/credenciados.json`, `components/Credentialed/credentialed-data.ts`, `components/Credentialed/CredentialedCard.tsx`, `components/Credentialed/CredentialedList.tsx`

- [ ] **Step 1: Create `data/credenciados.json`**

```json
[
  {
    "nome": "Dr. Ricardo Almeida",
    "especialidade": "Odontologia do Sono",
    "endereco": "Av. Paulista, 1578 - Sala 302, Bela Vista",
    "cidade": "Sao Paulo",
    "estado": "SP",
    "telefone": "1133456789",
    "cep_prefixo": "01"
  },
  {
    "nome": "Dra. Ana Martins",
    "especialidade": "Odontologia do Sono",
    "endereco": "R. Augusta, 2203 - Sala 12, Jardins",
    "cidade": "Sao Paulo",
    "estado": "SP",
    "telefone": "1134567890",
    "cep_prefixo": "01"
  },
  {
    "nome": "Dr. Carlos Souza",
    "especialidade": "Odontologia do Sono",
    "endereco": "Av. Brasil, 500 - Sala 8, Centro",
    "cidade": "Rio de Janeiro",
    "estado": "RJ",
    "telefone": "2134567890",
    "cep_prefixo": "20"
  },
  {
    "nome": "Dra. Mariana Costa",
    "especialidade": "Odontologia do Sono",
    "endereco": "R. XV de Novembro, 300 - Sala 5",
    "cidade": "Curitiba",
    "estado": "PR",
    "telefone": "4134567890",
    "cep_prefixo": "80"
  },
  {
    "nome": "Dr. Fernando Lima",
    "especialidade": "Odontologia do Sono",
    "endereco": "Av. Independencia, 1200 - Sala 45",
    "cidade": "Porto Alegre",
    "estado": "RS",
    "telefone": "5134567890",
    "cep_prefixo": "90"
  }
]
```

- [ ] **Step 2: Create `components/Credentialed/credentialed-data.ts`**

```typescript
import data from "@/data/credenciados.json";

export interface Dentist {
  nome: string;
  especialidade: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
  cep_prefixo: string;
}

export function filterByCep(cep: string): Dentist[] {
  const prefix = cep.slice(0, 2);
  const matched = (data as Dentist[]).filter((d) => d.cep_prefixo === prefix);
  if (matched.length > 0) return matched;
  // Fallback: return all
  return data as Dentist[];
}

export function getInitials(nome: string): string {
  return nome
    .replace(/^(Dr\.|Dra\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function formatPhone(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return phone;
}
```

- [ ] **Step 3: Create `components/Credentialed/CredentialedCard.tsx`**

```tsx
import { Phone, MapPin } from "lucide-react";
import { type Dentist, getInitials, formatPhone } from "./credentialed-data";

interface CredentialedCardProps {
  dentist: Dentist;
}

export function CredentialedCard({ dentist }: CredentialedCardProps) {
  return (
    <div className="rounded-[14px] border-[1.5px] border-border bg-off-white p-3.5">
      <div className="mb-2.5 flex items-center gap-2.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-blue-light font-heading text-sm font-bold text-blue">
          {getInitials(dentist.nome)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading text-sm font-semibold text-dark truncate">
            {dentist.nome}
          </div>
          <div className="font-body text-[11px] text-text-mid">
            {dentist.especialidade}
          </div>
        </div>
      </div>

      <p className="mb-2.5 font-body text-xs leading-snug text-text-mid">
        {dentist.endereco}, {dentist.cidade} - {dentist.estado}
      </p>

      <div className="flex gap-2">
        <a
          href={`tel:${dentist.telefone}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue px-3 py-2.5 font-heading text-xs font-semibold text-white cursor-pointer"
        >
          <Phone className="h-3.5 w-3.5" />
          Ligar
        </a>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(
            `${dentist.endereco}, ${dentist.cidade} ${dentist.estado}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-light px-3 py-2.5 font-heading text-xs font-semibold text-blue cursor-pointer"
        >
          <MapPin className="h-3.5 w-3.5" />
          Ver no mapa
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `components/Credentialed/CredentialedList.tsx`**

```tsx
"use client";

import { filterByCep } from "./credentialed-data";
import { CredentialedCard } from "./CredentialedCard";

interface CredentialedListProps {
  cep: string;
}

export function CredentialedList({ cep }: CredentialedListProps) {
  const dentists = filterByCep(cep);

  return (
    <section className="bg-white px-5 py-10">
      <div className="mx-auto max-w-[600px]">
        <h3 className="mb-1 font-heading text-base font-semibold text-dark">
          Credenciados EA Air
        </h3>
        <p className="mb-5 font-body text-xs text-text-mid">
          {dentists.length} dentista{dentists.length !== 1 ? "s" : ""} encontrado{dentists.length !== 1 ? "s" : ""} na sua regiao
        </p>

        <div className="space-y-2.5">
          {dentists.map((dentist) => (
            <CredentialedCard key={dentist.telefone} dentist={dentist} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add data/credenciados.json components/Credentialed/
git commit -m "feat: add credentialed dentist list with CEP filtering"
```

---

### Task 10: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-off-white px-5 py-8">
      <div className="mx-auto max-w-[600px] text-center">
        <Image
          src="/images/ea-logo.png"
          alt="EA Esthetic Aligner"
          width={150}
          height={33}
          className="mx-auto mb-4"
        />
        <div className="mb-4 flex items-center justify-center gap-6 font-body text-xs text-text-mid">
          <a href="#" className="hover:text-blue transition-colors">Sobre</a>
          <a href="#" className="hover:text-blue transition-colors">Contato</a>
          <a href="#" className="hover:text-blue transition-colors">Privacidade</a>
        </div>
        <p className="font-body text-[10px] text-text-light">
          &copy; {new Date().getFullYear()} EA Air — Esthetic Aligner. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 11: Wire Everything Together in page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update `app/page.tsx` with full flow state machine**

```tsx
"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Quiz } from "@/components/Quiz/Quiz";
import { LeadCapture } from "@/components/LeadCapture";
import { FullResult } from "@/components/FullResult";
import { CredentialedList } from "@/components/Credentialed/CredentialedList";
import { Footer } from "@/components/Footer";
import type { QuizResult } from "@/components/Quiz/quiz-data";

type FlowPhase = "landing" | "post-quiz" | "post-lead";

export default function Home() {
  const [phase, setPhase] = useState<FlowPhase>("landing");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [userCep, setUserCep] = useState("");

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setPhase("post-quiz");
    // Scroll to lead capture
    setTimeout(() => {
      document.getElementById("lead-capture")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLeadComplete = (cep: string) => {
    setUserCep(cep);
    setPhase("post-lead");
    setTimeout(() => {
      document.getElementById("resultado-completo")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main>
      <Hero />
      <Education />
      <Quiz onComplete={handleQuizComplete} />

      {phase === "post-quiz" && quizResult && (
        <div id="lead-capture">
          <LeadCapture quizResult={quizResult} onComplete={handleLeadComplete} />
        </div>
      )}

      {phase === "post-lead" && quizResult && (
        <>
          <div id="resultado-completo">
            <FullResult result={quizResult} />
          </div>
          <CredentialedList cep={userCep} />
        </>
      )}

      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and test full flow**

```bash
npm run dev
```

Test: Hero → scroll Education → Quiz (answer 6 questions) → Result → Lead Step 1 → Lead Step 2 → Full Result → Credentialed List → Footer.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire all sections into page with flow state machine"
```

---

### Task 12: Add .gitignore entries

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add project-specific entries to `.gitignore`**

Append to `.gitignore`:

```
# Brainstorm mockups
.superpowers/

# Lead data (sensitive)
data/leads.json
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add .superpowers and leads.json to gitignore"
```

---

### Task 13: Responsive Polish + Final QA

**Files:**
- Potentially modify any component for responsive fixes

- [ ] **Step 1: Run dev server and test at all breakpoints**

```bash
npm run dev
```

Open Chrome DevTools, test at:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (desktop small)
- 1440px (desktop large)

Verify:
- No horizontal scroll at any breakpoint
- Touch targets >= 48px on mobile
- Text readable without zooming (min 14px on inputs)
- Quiz options not overlapping
- Lead form fields not cut off
- Credentialed cards stack properly

- [ ] **Step 2: Run build to check for errors**

```bash
npm run build
```

Fix any TypeScript or build errors.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: responsive polish and build verification"
```
