"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, staggerItem } from "@/components/ui/FadeIn";
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
        <FadeIn>
          <h3 className="mb-1 font-heading text-base font-semibold text-dark">
            Credenciados EA Air
          </h3>
          <p className="mb-5 font-body text-xs text-text-mid">
            {dentists.length} dentista{dentists.length !== 1 ? "s" : ""}{" "}
            encontrado{dentists.length !== 1 ? "s" : ""} na sua região
          </p>
        </FadeIn>
        <StaggerChildren className="space-y-2.5" staggerDelay={0.1} baseDelay={0.15}>
          {dentists.map((dentist) => (
            <motion.div key={dentist.telefone} variants={staggerItem}>
              <CredentialedCard dentist={dentist} />
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
