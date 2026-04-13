"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, staggerItem } from "@/components/ui/FadeIn";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Target,
  Users,
  Smartphone,
  TrendingUp,
  Package,
  CreditCard,
  MessageSquare,
  MapPin,
  HeartPulse,
  ShieldCheck,
  Truck,
  BarChart3,
  Stethoscope,
  ScanLine,
  Home,
  Headphones,
  ChevronRight,
  CheckCircle2,
  Circle,
  ArrowRight,
} from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

/* ─── Data ───────────────────────────────────────────────── */

const marketStats = [
  { value: "1 em 3", label: "pessoas têm apneia", accent: "blue" as const },
  { value: "80%", label: "não sabem que têm", accent: "red" as const },
  { value: "R$ 3,5 bi", label: "mercado Brasil (sono)", accent: "blue" as const },
];

const painPoints = [
  {
    icon: Users,
    title: "Dentistas não vendem",
    description:
      "A experiência do primeiro contato com o dentista é, na maioria das vezes, ruim. Dentistas são excelentes clínicos, mas não são treinados para vender.",
  },
  {
    icon: CreditCard,
    title: "Preço incontrolável",
    description:
      "No modelo B2B2C, cada dentista define seu preço. Isso impossibilita comunicar valor de forma consistente e gera desconfiança no paciente.",
  },
  {
    icon: Stethoscope,
    title: "Fricção desnecessária",
    description:
      "Diferente de alinhadores, o EA Air não exige avaliação clínica. O paciente precisa apenas de um escaneamento 3D — disponível em qualquer laboratório parceiro.",
  },
];

const journeySteps = [
  {
    icon: Smartphone,
    title: "Descoberta",
    description: "Paciente encontra o EA Air via anúncios ou busca orgânica e acessa eaair.com.br.",
    color: "bg-blue/10 text-blue",
  },
  {
    icon: HeartPulse,
    title: "Qualificação",
    description: "Quiz STOP-Bang de 2 minutos identifica o nível de risco para apneia obstrutiva do sono.",
    color: "bg-blue/10 text-blue",
  },
  {
    icon: MessageSquare,
    title: "Conversão",
    description: "Self-checkout, chatbot IA com persona de dentista, ou equipe de vendas dedicada.",
    color: "bg-blue/10 text-blue",
  },
  {
    icon: ScanLine,
    title: "Escaneamento 3D",
    description: "Paciente vai ao laboratório parceiro mais próximo para um escaneamento rápido da arcada.",
    color: "bg-blue/10 text-blue",
  },
  {
    icon: ShieldCheck,
    title: "Revisão Clínica",
    description: "Equipe interna de ortodontistas da EA revisa cada caso e aprova a fabricação do dispositivo.",
    color: "bg-blue/10 text-blue",
  },
  {
    icon: Truck,
    title: "Entrega em Casa",
    description: "3 dispositivos entregues ao longo de 12 meses (meses 1, 5 e 9). Sem ir ao dentista.",
    color: "bg-blue/10 text-blue",
  },
];

const revenueData = [
  { label: "Preço mensal", value: "R$ 299/mês" },
  { label: "Duração do tratamento", value: "12 meses" },
  { label: "Receita por paciente", value: "R$ 3.588" },
  { label: "Pagamento via Pix", value: "R$ 3.229 (10% desc.)" },
  { label: "Dispositivos entregues", value: "3 unidades" },
  { label: "Troca a cada", value: "4 meses" },
];

const salesTiers = [
  {
    icon: Smartphone,
    tier: "Self-service",
    channel: "Website",
    availability: "24/7",
    description: "Quiz + checkout para pacientes de alta intenção. Conversão direta sem intermediários.",
  },
  {
    icon: MessageSquare,
    tier: "Chatbot IA",
    channel: "WhatsApp / Site",
    availability: "24/7",
    description:
      "Assistente com persona de dentista, claramente identificado como IA. Responde dúvidas, conduz ao fechamento.",
  },
  {
    icon: Headphones,
    tier: "Equipe de Vendas",
    channel: "Telefone / WhatsApp",
    availability: "Horário comercial",
    description:
      "Atendimento humano para leads hesitantes, casos complexos ou pacientes que preferem contato pessoal.",
  },
];

const differentiators = [
  {
    before: "Dentista vende (experiência inconsistente)",
    after: "Equipe treinada vende (CX controlada)",
  },
  {
    before: "Dentista define o preço (variável)",
    after: "Preço único: R$ 299/mês",
  },
  {
    before: "Primeiro contato no consultório",
    after: "Primeiro contato digital ou por telefone",
  },
  {
    before: "Entrega pelo dentista",
    after: "Entrega direta na casa do paciente",
  },
  {
    before: "Relacionamento do dentista com o paciente",
    after: "Relacionamento da EA com o paciente",
  },
  {
    before: "Dentista ganha margem na revenda",
    after: "Dentista ganha comissão por indicação",
  },
];

const unitEconomics = [
  { metric: "LTV por paciente (cartão)", value: "R$ 3.588" },
  { metric: "LTV por paciente (Pix)", value: "R$ 3.229" },
  { metric: "Orçamento marketing (lançamento)", value: "R$ 10.000/mês" },
  { metric: "CAC estimado", value: "R$ 150 – 500" },
  { metric: "Comissão dentista (~15%)", value: "~R$ 538/paciente" },
];

/* ─── Sections ───────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden flex items-end lg:items-center">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 30% 100%, rgba(24,99,220,0.7) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 15%, rgba(99,102,241,0.4) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 60% 60%, rgba(24,99,220,0.15) 0%, transparent 50%), linear-gradient(175deg, #070D1A 0%, #0B1632 25%, #0F1E42 50%, #0C1735 75%, #08102A 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] bg-[length:200px] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute -top-10 -right-8 h-[180px] w-[180px] rounded-full bg-blue/15 blur-[50px] animate-[drift_10s_ease-in-out_infinite] lg:h-[350px] lg:w-[350px] lg:blur-[100px]" />
      <div className="absolute bottom-24 -left-5 h-[120px] w-[120px] rounded-full bg-indigo-500/12 blur-[50px] animate-[drift_10s_ease-in-out_infinite_-4s] lg:h-[250px] lg:w-[250px] lg:blur-[80px]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-12 pt-14 lg:px-12 lg:py-24">
        {/* Back link */}
        <motion.div {...fadeUp(0)}>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 font-body text-[12px] text-white/40 hover:text-white/70 transition-colors lg:text-[13px] lg:mb-10"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao site
          </Link>
        </motion.div>

        {/* Logo */}
        <motion.div className="mb-8 lg:mb-10" {...fadeUp(0.1)}>
          <Image
            src="/images/ea-logo.png"
            alt="EA Esthetic Aligner"
            width={140}
            height={30}
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] lg:w-[180px]"
            priority
          />
        </motion.div>

        {/* Tag */}
        <motion.div {...fadeUp(0.2)}>
          <span className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-white/50 backdrop-blur-sm lg:text-[11px] lg:px-4 lg:py-2">
            Plano de Negócio
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mt-5 mb-4 font-heading text-[28px] font-semibold leading-[1.18] text-white/95 tracking-tight lg:text-[52px] lg:leading-[1.12] lg:max-w-[750px] lg:mt-6 lg:mb-6"
          {...fadeUp(0.3)}
        >
          EA Air: direto ao{" "}
          <span className="bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            paciente.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="max-w-[320px] font-body text-[14px] font-light leading-relaxed text-white/45 lg:max-w-[560px] lg:text-[18px] lg:leading-relaxed"
          {...fadeUp(0.45)}
        >
          Um novo modelo de negócio que elimina intermediários,
          controla a experiência do paciente e entrega tratamento para
          apneia do sono diretamente na casa de quem precisa.
        </motion.p>

        {/* Market stats */}
        <motion.div
          className="mt-8 grid w-full grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/[0.04] lg:mt-12 lg:max-w-[560px] lg:rounded-2xl"
          {...fadeUp(0.6)}
        >
          {marketStats.map((stat) => (
            <div key={stat.value} className="bg-white/[0.02] px-2 py-3.5 text-center lg:py-5 lg:px-4">
              <div
                className={`font-heading text-[16px] font-semibold tracking-tight lg:text-[22px] ${
                  stat.accent === "red" ? "text-red-400" : "text-white/90"
                }`}
              >
                {stat.value}
              </div>
              <div className="mt-0.5 font-body text-[10px] text-white/30 leading-tight lg:text-[12px] lg:mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="bg-off-white px-5 py-16 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn className="mb-10 lg:mb-14">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-red lg:text-[11px]">
            O Problema
          </span>
          <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight lg:text-[38px]">
            Por que o modelo atual não funciona
          </h2>
          <p className="max-w-[520px] font-body text-sm text-text-mid leading-relaxed lg:text-base">
            O modelo B2B2C da Esthetic Aligner funciona para alinhadores.
            Para o EA Air, ele gera três problemas críticos.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-4 md:grid-cols-3 md:gap-6 lg:gap-8" staggerDelay={0.15}>
          {painPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={staggerItem}
              className="rounded-2xl border-[1.5px] border-red/10 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 lg:p-8"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red/8 lg:h-12 lg:w-12 lg:mb-4">
                <point.icon className="h-5 w-5 text-red lg:h-6 lg:w-6" />
              </div>
              <h3 className="mb-2 font-heading text-[15px] font-semibold text-dark lg:text-[17px] lg:mb-3">
                {point.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed text-text-mid lg:text-[14px]">
                {point.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="bg-white px-5 py-16 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn className="mb-10 lg:mb-14">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue lg:text-[11px]">
            A Solução
          </span>
          <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight lg:text-[38px]">
            Modelo D2C: vendas centralizadas
          </h2>
          <p className="max-w-[560px] font-body text-sm text-text-mid leading-relaxed lg:text-base">
            Eliminamos o intermediário. Uma equipe de vendas interna, treinada e
            dedicada, conduz o paciente da descoberta até a entrega em casa.
          </p>
        </FadeIn>

        {/* Journey */}
        <StaggerChildren className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5" staggerDelay={0.1}>
          {journeySteps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="group relative rounded-2xl border-[1.5px] border-border bg-off-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue/20 lg:p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/8 transition-colors duration-300 group-hover:bg-blue/15 lg:h-11 lg:w-11">
                  <step.icon className="h-5 w-5 text-blue" />
                </div>
                <span className="font-heading text-[11px] font-semibold text-blue/40 tracking-wide">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-1.5 font-heading text-[15px] font-semibold text-dark lg:text-[16px]">
                {step.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed text-text-mid lg:text-[14px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function SalesSection() {
  return (
    <section className="bg-off-white px-5 py-16 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn className="mb-10 lg:mb-14">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue lg:text-[11px]">
            Estrutura Comercial
          </span>
          <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight lg:text-[38px]">
            Três camadas de conversão
          </h2>
          <p className="max-w-[520px] font-body text-sm text-text-mid leading-relaxed lg:text-base">
            Cada paciente tem um perfil de decisão diferente. Nossa
            estrutura cobre desde quem quer comprar sozinho até quem
            precisa de acompanhamento humano.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-4 md:grid-cols-3 md:gap-6 lg:gap-8" staggerDelay={0.15}>
          {salesTiers.map((tier) => (
            <motion.div
              key={tier.tier}
              variants={staggerItem}
              className="rounded-2xl border-[1.5px] border-border bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 lg:p-8"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-light lg:h-12 lg:w-12">
                  <tier.icon className="h-5 w-5 text-blue lg:h-6 lg:w-6" />
                </div>
                <span className="rounded-full bg-blue/8 px-2.5 py-1 font-heading text-[10px] font-semibold text-blue tracking-wide lg:text-[11px]">
                  {tier.availability}
                </span>
              </div>
              <h3 className="mb-1 font-heading text-[15px] font-semibold text-dark lg:text-[17px]">
                {tier.tier}
              </h3>
              <p className="mb-3 font-body text-[11px] text-text-light lg:text-[12px]">
                {tier.channel}
              </p>
              <p className="font-body text-[13px] leading-relaxed text-text-mid lg:text-[14px]">
                {tier.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function RevenueSection() {
  return (
    <section className="bg-white px-5 py-16 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn className="mb-10 lg:mb-14">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue lg:text-[11px]">
            Modelo de Receita
          </span>
          <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight lg:text-[38px]">
            R$ 299/mês. Simples assim.
          </h2>
          <p className="max-w-[560px] font-body text-sm text-text-mid leading-relaxed lg:text-base">
            Preço único, comunicação clara, sem surpresas. O paciente
            sabe exatamente o que vai pagar antes de começar.
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Pricing card */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border-[1.5px] border-blue/20 bg-gradient-to-br from-blue/[0.03] to-transparent p-6 lg:p-8">
              <div className="mb-6">
                <div className="font-heading text-[40px] font-semibold text-dark tracking-tight lg:text-[56px]">
                  R$ 299
                  <span className="text-[18px] font-normal text-text-mid lg:text-[22px]">/mês</span>
                </div>
                <p className="mt-1 font-body text-[13px] text-text-mid lg:text-[14px]">
                  12 meses de tratamento completo
                </p>
              </div>

              <div className="space-y-3">
                {revenueData.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-body text-[13px] text-text-mid lg:text-[14px]">{item.label}</span>
                    <span className="font-heading text-[13px] font-semibold text-dark lg:text-[14px]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Payment options */}
          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <div className="rounded-2xl border-[1.5px] border-border bg-off-white p-5 lg:p-7">
                <div className="mb-2 flex items-center gap-2">
                  <CreditCard className="h-4.5 w-4.5 text-blue" />
                  <h4 className="font-heading text-[14px] font-semibold text-dark lg:text-[15px]">
                    Cartão de Crédito
                  </h4>
                </div>
                <p className="font-body text-[13px] text-text-mid leading-relaxed lg:text-[14px]">
                  12 parcelas de R$ 299 sem juros. Compromisso fixo — não
                  cancelável. O paciente assume o tratamento completo no ato da compra.
                </p>
              </div>

              <div className="rounded-2xl border-[1.5px] border-green/20 bg-green/[0.03] p-5 lg:p-7">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-[18px] w-[18px] items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-green" fill="currentColor">
                      <path d="M12.49 3.16c-.28-.17-.63-.17-.91 0L3.33 8.09c-.42.25-.42.86 0 1.11l8.25 4.93c.28.17.63.17.91 0l8.25-4.93c.42-.25.42-.86 0-1.11L12.49 3.16zM12.04 15.87L4.42 11.3c-.44-.26-.98.1-.98.63v4.68c0 .32.17.62.45.78l7.24 4.33c.28.17.63.17.91 0l7.24-4.33c.28-.17.45-.46.45-.78v-4.68c0-.53-.54-.89-.98-.63l-7.62 4.57c-.03.02-.06.03-.09.03z" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-[14px] font-semibold text-dark lg:text-[15px]">
                    Pix à Vista
                  </h4>
                  <span className="rounded-full bg-green/10 px-2 py-0.5 font-heading text-[10px] font-semibold text-green">
                    10% OFF
                  </span>
                </div>
                <p className="font-body text-[13px] text-text-mid leading-relaxed lg:text-[14px]">
                  Pagamento único de R$ 3.229 via Pix. Desconto de 10% para
                  quem prefere resolver tudo de uma vez.
                </p>
              </div>

              <div className="rounded-2xl border-[1.5px] border-border bg-off-white p-5 lg:p-7">
                <div className="mb-2 flex items-center gap-2">
                  <Package className="h-4.5 w-4.5 text-blue" />
                  <h4 className="font-heading text-[14px] font-semibold text-dark lg:text-[15px]">
                    O que está incluso
                  </h4>
                </div>
                <ul className="space-y-2 mt-3">
                  {[
                    "3 dispositivos EA Air (meses 1, 5 e 9)",
                    "Revisão clínica por ortodontistas",
                    "Entrega em domicílio",
                    "Acompanhamento da equipe de CX",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" />
                      <span className="font-body text-[13px] text-text-mid lg:text-[14px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="bg-off-white px-5 py-16 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn className="mb-10 lg:mb-14">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue lg:text-[11px]">
            Antes vs. Depois
          </span>
          <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight lg:text-[38px]">
            O que muda com o modelo D2C
          </h2>
          <p className="max-w-[520px] font-body text-sm text-text-mid leading-relaxed lg:text-base">
            Comparativo direto entre o modelo atual (B2B2C via dentistas)
            e o novo modelo direto ao consumidor.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="overflow-hidden rounded-2xl border-[1.5px] border-border bg-white">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_1fr] border-b border-border bg-off-white px-4 py-3 lg:px-8 lg:py-4">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[2px] text-text-light lg:text-[12px]">
                Antes (B2B2C)
              </span>
              <span className="px-3" />
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[2px] text-blue lg:text-[12px]">
                Depois (D2C)
              </span>
            </div>

            {/* Rows */}
            {differentiators.map((diff, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3.5 lg:px-8 lg:py-4 ${
                  i < differentiators.length - 1 ? "border-b border-border/60" : ""
                }`}
              >
                <span className="font-body text-[12px] text-text-light line-through decoration-red/30 lg:text-[14px]">
                  {diff.before}
                </span>
                <ChevronRight className="mx-2 h-3.5 w-3.5 shrink-0 text-blue/30 lg:mx-4" />
                <span className="font-body text-[12px] font-medium text-dark lg:text-[14px]">
                  {diff.after}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function EconomicsSection() {
  return (
    <section className="bg-white px-5 py-16 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn className="mb-10 lg:mb-14">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue lg:text-[11px]">
            Unit Economics
          </span>
          <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight lg:text-[38px]">
            Números do modelo
          </h2>
          <p className="max-w-[520px] font-body text-sm text-text-mid leading-relaxed lg:text-base">
            Projeções iniciais para validação do modelo com orçamento
            enxuto de lançamento.
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Key metrics */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border-[1.5px] border-border bg-off-white p-5 lg:p-8">
              <h3 className="mb-5 font-heading text-[14px] font-semibold text-dark lg:text-[16px]">
                Métricas-chave
              </h3>
              <div className="space-y-3">
                {unitEconomics.map((item) => (
                  <div
                    key={item.metric}
                    className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-body text-[13px] text-text-mid lg:text-[14px]">{item.metric}</span>
                    <span className="font-heading text-[13px] font-semibold text-dark lg:text-[14px]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Scenarios */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border-[1.5px] border-border bg-off-white p-5 lg:p-8">
              <h3 className="mb-5 font-heading text-[14px] font-semibold text-dark lg:text-[16px]">
                Cenários de conversão
              </h3>
              <p className="mb-5 font-body text-[13px] text-text-mid leading-relaxed lg:text-[14px]">
                Com orçamento de R$ 10.000/mês em marketing, a quantidade
                de pacientes convertidos depende do custo de aquisição:
              </p>

              <div className="space-y-3">
                {[
                  { cac: "R$ 150", patients: "~66", revenue: "R$ 237k/mês", color: "text-green" },
                  { cac: "R$ 300", patients: "~33", revenue: "R$ 118k/mês", color: "text-blue" },
                  { cac: "R$ 500", patients: "~20", revenue: "R$ 71k/mês", color: "text-orange" },
                ].map((scenario) => (
                  <div
                    key={scenario.cac}
                    className="flex items-center gap-4 rounded-xl bg-white p-3.5 lg:p-4"
                  >
                    <div className="shrink-0">
                      <div className={`font-heading text-[14px] font-semibold ${scenario.color} lg:text-[15px]`}>
                        CAC {scenario.cac}
                      </div>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="font-heading text-[13px] font-semibold text-dark lg:text-[14px]">
                        {scenario.patients} pacientes
                      </div>
                      <div className="font-body text-[11px] text-text-light lg:text-[12px]">
                        {scenario.revenue} receita
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function DentistSection() {
  return (
    <section className="bg-off-white px-5 py-16 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <FadeIn>
            <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue lg:text-[11px]">
              Canal Dentista
            </span>
            <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight lg:text-[38px]">
              Dentistas como parceiros, não revendedores
            </h2>
            <p className="mb-6 font-body text-sm text-text-mid leading-relaxed lg:text-base lg:mb-8">
              Em vez de cortar os dentistas do processo, transformamos
              o papel deles. De revendedores com margem e preço livre,
              passam a ser indicadores com comissão fixa e preço
              controlado.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Comissão por indicação",
                  desc: "Aproximadamente 15% por paciente convertido (~R$ 538). O dentista indica, a EA vende e entrega.",
                },
                {
                  title: "Preço máximo definido",
                  desc: "Cap de R$ 299/mês. Dentistas não podem cobrar mais, garantindo uniformidade na comunicação de valor.",
                },
                {
                  title: "Rede preservada",
                  desc: "Os 7.000+ dentistas credenciados da Esthetic Aligner continuam participando — com regras claras.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue/10">
                    <CheckCircle2 className="h-3 w-3 text-blue" />
                  </div>
                  <div>
                    <h4 className="font-heading text-[14px] font-semibold text-dark lg:text-[15px]">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 font-body text-[13px] text-text-mid leading-relaxed lg:text-[14px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-2xl border-[1.5px] border-border bg-white p-6 lg:p-8">
              <h3 className="mb-5 text-center font-heading text-[14px] font-semibold text-dark lg:text-[16px]">
                Transição do modelo
              </h3>
              <div className="space-y-4">
                {[
                  { before: "Dentista compra EA Air", after: "Dentista indica paciente" },
                  { before: "Define preço livremente", after: "Preço fixo: R$ 299/mês" },
                  { before: "Margem na revenda", after: "Comissão de ~15%" },
                  { before: "Dono do relacionamento", after: "EA dona do relacionamento" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1 rounded-lg bg-red/[0.04] px-3 py-2.5">
                      <span className="font-body text-[12px] text-text-light lg:text-[13px]">{item.before}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-blue/40" />
                    <div className="flex-1 rounded-lg bg-blue/[0.04] px-3 py-2.5">
                      <span className="font-body text-[12px] font-medium text-dark lg:text-[13px]">{item.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-16 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn className="mb-10 lg:mb-14">
          <span className="mb-3 inline-block font-heading text-[10px] font-semibold uppercase tracking-[2.5px] text-blue lg:text-[11px]">
            Jornada do Paciente
          </span>
          <h2 className="mb-3 font-heading text-[22px] font-semibold leading-tight text-dark tracking-tight lg:text-[38px]">
            12 meses de tratamento
          </h2>
          <p className="max-w-[520px] font-body text-sm text-text-mid leading-relaxed lg:text-base">
            O paciente recebe 3 dispositivos ao longo do tratamento, com
            acompanhamento da equipe de CX em cada etapa.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
            {[
              {
                month: "Mês 1",
                title: "Dispositivo #1",
                steps: [
                  "Compra e pagamento",
                  "Escaneamento 3D no lab parceiro",
                  "Revisão clínica pela equipe EA",
                  "Fabricação e envio",
                  "Dispositivo chega em casa",
                ],
                active: true,
              },
              {
                month: "Mês 5",
                title: "Dispositivo #2",
                steps: [
                  "Envio automático do segundo dispositivo",
                  "Contato da equipe de CX para acompanhamento",
                  "Troca pelo novo dispositivo",
                ],
                active: false,
              },
              {
                month: "Mês 9",
                title: "Dispositivo #3",
                steps: [
                  "Envio automático do terceiro dispositivo",
                  "Acompanhamento final da equipe de CX",
                  "Troca pelo dispositivo final",
                  "Tratamento completo no mês 12",
                ],
                active: false,
              },
            ].map((phase) => (
              <div
                key={phase.month}
                className={`rounded-2xl border-[1.5px] p-5 lg:p-7 ${
                  phase.active
                    ? "border-blue/25 bg-blue/[0.02]"
                    : "border-border bg-off-white"
                }`}
              >
                <div className="mb-1 font-heading text-[11px] font-semibold uppercase tracking-[2px] text-blue">
                  {phase.month}
                </div>
                <h3 className="mb-4 font-heading text-[16px] font-semibold text-dark lg:text-[18px]">
                  {phase.title}
                </h3>
                <ul className="space-y-2.5">
                  {phase.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2">
                      <Circle className="mt-[5px] h-2 w-2 shrink-0 fill-blue/20 text-blue/40" />
                      <span className="font-body text-[13px] text-text-mid leading-snug lg:text-[14px]">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background — same as hero */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(24,99,220,0.6) 0%, transparent 55%), linear-gradient(175deg, #070D1A 0%, #0B1632 40%, #0F1E42 70%, #08102A 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] bg-[length:200px] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-10 right-10 h-[150px] w-[150px] rounded-full bg-blue/10 blur-[60px] animate-[drift_10s_ease-in-out_infinite] lg:h-[250px] lg:w-[250px] lg:blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-[700px] px-5 py-20 text-center lg:py-32">
        <FadeIn>
          <h2 className="mb-4 font-heading text-[24px] font-semibold leading-tight text-white/95 tracking-tight lg:text-[42px] lg:mb-6">
            Pronto para construir o{" "}
            <span className="bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              futuro
            </span>{" "}
            do tratamento de apneia?
          </h2>
          <p className="mx-auto mb-8 max-w-[400px] font-body text-[14px] font-light leading-relaxed text-white/40 lg:text-[16px] lg:max-w-[480px] lg:mb-10">
            Este plano é o ponto de partida. Os números vão evoluir,
            mas a direção está clara: o paciente no centro, a
            experiência sob controle.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[13px] bg-blue px-6 py-4 font-heading text-[14px] font-semibold text-white shadow-[0_4px_14px_var(--color-blue-glow)] transition-all duration-150 hover:shadow-[0_6px_24px_rgba(24,99,220,0.25)] active:scale-[0.98] lg:text-[15px] lg:px-8"
          >
            Conhecer o EA Air
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────── */

export default function PlanoPage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <SalesSection />
      <RevenueSection />
      <ComparisonSection />
      <EconomicsSection />
      <DentistSection />
      <TimelineSection />
      <CtaSection />

      {/* Footer */}
      <footer className="border-t border-border bg-off-white px-5 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1200px] text-center lg:flex lg:items-center lg:justify-between lg:text-left">
          <Image src="/images/ea-logo.png" alt="EA Esthetic Aligner" width={150} height={33} className="mx-auto mb-4 lg:mx-0 lg:mb-0" />
          <div className="mb-4 flex items-center justify-center gap-6 font-body text-xs text-text-mid lg:mb-0 lg:gap-8 lg:text-sm">
            <Link href="/" className="hover:text-blue transition-colors">Home</Link>
            <Link href="/plano" className="text-blue font-medium">Plano</Link>
          </div>
          <p className="font-body text-[10px] text-text-light lg:text-xs">&copy; {new Date().getFullYear()} EA Air — Esthetic Aligner</p>
        </div>
      </footer>
    </main>
  );
}
