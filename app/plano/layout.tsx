import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plano de Negócio — EA Air",
  description:
    "Modelo D2C para tratamento de apneia do sono. Vendas centralizadas, preço único de R$299/mês, entrega direta ao paciente.",
};

export default function PlanoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
