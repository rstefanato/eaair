"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Quiz } from "@/components/Quiz/Quiz";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <main>
      <Hero onStartQuiz={() => setShowQuiz(true)} />
      <Education onStartQuiz={() => setShowQuiz(true)} />

      <AnimatePresence>
        {showQuiz && (
          <Quiz onClose={() => setShowQuiz(false)} />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
