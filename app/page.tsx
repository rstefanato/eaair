"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Quiz } from "@/components/Quiz/Quiz";
import { FullResult } from "@/components/FullResult";
import { CredentialedList } from "@/components/Credentialed/CredentialedList";
import { Footer } from "@/components/Footer";
import type { QuizResult } from "@/components/Quiz/quiz-data";

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [userCep, setUserCep] = useState("");

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const handleQuizComplete = (result: QuizResult, cep: string) => {
    setQuizResult(result);
    setUserCep(cep);
    setShowQuiz(false);
    setTimeout(() => {
      document.getElementById("resultado-completo")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main>
      <Hero onStartQuiz={handleStartQuiz} />
      <Education onStartQuiz={handleStartQuiz} />

      <AnimatePresence>
        {showQuiz && (
          <Quiz onComplete={handleQuizComplete} onClose={handleCloseQuiz} />
        )}
      </AnimatePresence>

      {quizResult && (
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
