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
  return data as Dentist[];
}

export function getInitials(nome: string): string {
  return nome.replace(/^(Dr\.|Dra\.)\s*/i, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export function formatPhone(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return phone;
}
