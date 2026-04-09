"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onStartQuiz: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

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
            "radial-gradient(ellipse 90% 70% at 30% 100%, rgba(24,99,220,0.7) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 15%, rgba(99,102,241,0.4) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 60% 60%, rgba(24,99,220,0.15) 0%, transparent 50%), linear-gradient(175deg, #070D1A 0%, #0B1632 25%, #0F1E42 50%, #0C1735 75%, #08102A 100%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] bg-[length:200px] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-10 -right-8 h-[180px] w-[180px] rounded-full bg-blue/15 blur-[50px] animate-[drift_10s_ease-in-out_infinite] lg:h-[350px] lg:w-[350px] lg:blur-[100px] lg:-top-20 lg:-right-20" />
      <div className="absolute bottom-24 -left-5 h-[120px] w-[120px] rounded-full bg-indigo-500/12 blur-[50px] animate-[drift_10s_ease-in-out_infinite_-4s] lg:h-[250px] lg:w-[250px] lg:blur-[80px] lg:bottom-32 lg:-left-16" />
      <div className="hidden lg:block absolute top-1/3 right-1/4 h-[120px] w-[120px] rounded-full bg-purple-500/8 blur-[60px] animate-[drift_10s_ease-in-out_infinite_-7s]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen flex-col justify-end px-5 pb-6 pt-14 md:pt-20 lg:items-center lg:justify-center lg:px-12 lg:pt-0 lg:pb-0">
        {/* Logo */}
        <motion.div className="mb-5 lg:mb-10" {...fadeUp(0.1)}>
          <Image
            src="/images/ea-logo.png"
            alt="EA Esthetic Aligner"
            width={160}
            height={35}
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] lg:w-[200px] lg:mx-auto"
            priority
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          className="mb-5 flex items-center gap-[7px] self-start rounded-full border border-white/[0.08] bg-white/[0.06] px-3.5 py-[7px] backdrop-blur-xl lg:self-center lg:mb-8 lg:px-5 lg:py-2"
          {...fadeUp(0.25)}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.4)] animate-pulse" />
          <span className="font-body text-[11.5px] text-white/60 lg:text-[13px]">
            Teste gratuito em 2 min
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mb-3.5 font-heading text-[27px] font-semibold leading-[1.2] text-white/95 tracking-tight md:text-[36px] lg:text-center lg:text-[52px] lg:leading-[1.15] lg:mb-6 lg:max-w-[700px]"
          {...fadeUp(0.4)}
        >
          Uma boa noite de sono{" "}
          <br className="hidden lg:block" />
          muda{" "}
          <span className="bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            tudo.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-8 max-w-[260px] font-body text-sm font-light leading-relaxed text-white/45 md:max-w-[380px] md:text-base lg:text-center lg:max-w-[520px] lg:text-lg lg:leading-relaxed lg:mb-10 lg:text-white/50"
          {...fadeUp(0.55)}
        >
          Descubra se você tem sinais de apneia obstrutiva do sono com nosso
          teste rápido e gratuito.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex w-full flex-col gap-2.5 lg:flex-row lg:justify-center lg:gap-4 lg:max-w-[520px] lg:mx-auto"
          {...fadeUp(0.7)}
        >
          <Button
            variant="primary"
            onClick={onStartQuiz}
            className="lg:w-auto lg:min-w-[240px] lg:py-[18px] lg:text-[15px]"
          >
            Fazer o teste agora
            <ArrowRight className="h-[15px] w-[15px]" />
          </Button>
          <Button
            variant="ghost"
            onClick={scrollToEducation}
            className="lg:w-auto lg:min-w-[240px] lg:py-[18px] lg:text-[15px]"
          >
            <ChevronDown className="h-[13px] w-[13px] opacity-50" />
            Saiba mais sobre apneia
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-4 grid w-full grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/[0.04] md:max-w-[380px] lg:mt-10 lg:mx-auto lg:max-w-[540px] lg:rounded-2xl"
          {...fadeUp(0.85)}
        >
          {[
            { value: "1 em 3", label: "pessoas tem apneia" },
            { value: "80%", label: "não sabem que tem" },
            { value: "2 min", label: "para descobrir" },
          ].map((stat) => (
            <div
              key={stat.value}
              className="bg-white/[0.02] px-1.5 py-3 text-center lg:py-5 lg:px-4"
            >
              <div className="font-heading text-[17px] font-semibold text-white/90 tracking-tight lg:text-[22px]">
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
