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
