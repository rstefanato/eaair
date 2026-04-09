"use client";

import { filterByCep } from "./credentialed-data";
import { CredentialedCard } from "./CredentialedCard";

interface CredentialedListProps { cep: string; }

export function CredentialedList({ cep }: CredentialedListProps) {
  const dentists = filterByCep(cep);
  return (
    <section className="bg-white px-5 py-10">
      <div className="mx-auto max-w-[600px]">
        <h3 className="mb-1 font-heading text-base font-semibold text-dark">Credenciados EA Air</h3>
        <p className="mb-5 font-body text-xs text-text-mid">{dentists.length} dentista{dentists.length !== 1 ? "s" : ""} encontrado{dentists.length !== 1 ? "s" : ""} na sua regiao</p>
        <div className="space-y-2.5">
          {dentists.map((dentist) => (<CredentialedCard key={dentist.telefone} dentist={dentist} />))}
        </div>
      </div>
    </section>
  );
}
