"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onStartQuiz: () => void;
}

export function Hero({ onStartQuiz }: HeroProps) {
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
      <div className="absolute -top-10 -right-8 h-[180px] w-[180px] rounded-full bg-blue/15 blur-[50px] animate-[drift_10s_ease-in-out_infinite] lg:h-[280px] lg:w-[280px] lg:blur-[80px]" />
      <div className="absolute bottom-24 -left-5 h-[120px] w-[120px] rounded-full bg-indigo-500/12 blur-[50px] animate-[drift_10s_ease-in-out_infinite_-4s] lg:h-[200px] lg:w-[200px] lg:blur-[70px]" />

      {/* Dot grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[600px] flex-col px-5 pb-6 pt-14 md:items-center md:justify-center md:pt-20 md:text-center lg:max-w-[720px] lg:px-8 lg:py-24">
        {/* Logo */}
        <div className="mb-8 flex items-center md:justify-center">
          <Image
            src="/images/ea-logo.png"
            alt="EA Esthetic Aligner"
            width={180}
            height={39}
            className="brightness-0 invert opacity-90 lg:w-[220px]"
            priority
          />
        </div>

        {/* Badge */}
        <div className="mb-5 flex items-center gap-[7px] self-start rounded-full border border-white/[0.08] bg-white/[0.06] px-3.5 py-[7px] backdrop-blur-xl md:self-center lg:mb-7">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.4)] animate-pulse" />
          <span className="font-body text-[11.5px] text-white/60">
            Teste gratuito em 2 min
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-3.5 font-heading text-[27px] font-semibold leading-[1.2] text-white/95 tracking-tight md:text-[36px] lg:mb-5 lg:text-[42px]">
          Uma boa noite de sono muda{" "}
          <span className="bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            tudo.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-8 max-w-[260px] font-body text-sm font-light leading-relaxed text-white/45 md:max-w-[380px] md:text-base lg:mb-10 lg:max-w-[460px] lg:text-[17px] lg:leading-relaxed">
          Descubra se você tem sinais de apneia obstrutiva do sono com nosso
          teste rápido e gratuito.
        </p>

        {/* CTAs */}
        <div className="mt-auto flex w-full flex-col gap-2.5 md:mt-0 md:max-w-[380px] lg:mx-auto lg:max-w-[380px]">
          <Button variant="primary" onClick={onStartQuiz}>
            Fazer o teste agora
            <ArrowRight className="h-[15px] w-[15px]" />
          </Button>
          <Button variant="ghost" onClick={scrollToEducation}>
            <ChevronDown className="h-[13px] w-[13px] opacity-50" />
            Saiba mais sobre apneia
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-4 grid w-full grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/[0.04] md:max-w-[380px] lg:mx-auto lg:mt-6 lg:max-w-[420px]">
          {[
            { value: "1 em 3", label: "pessoas tem apneia" },
            { value: "80%", label: "não sabem que tem" },
            { value: "2 min", label: "para descobrir" },
          ].map((stat) => (
            <div key={stat.value} className="bg-white/[0.02] px-1.5 py-3 text-center lg:py-4">
              <div className="font-heading text-[17px] font-semibold text-white/90 tracking-tight lg:text-[19px]">
                {stat.value}
              </div>
              <div className="mt-0.5 font-body text-[10px] text-white/30 leading-tight lg:text-[11px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
