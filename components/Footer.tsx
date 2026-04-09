import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-off-white px-5 py-8">
      <div className="mx-auto max-w-[600px] text-center">
        <Image src="/images/ea-logo.png" alt="EA Esthetic Aligner" width={150} height={33} className="mx-auto mb-4" />
        <div className="mb-4 flex items-center justify-center gap-6 font-body text-xs text-text-mid">
          <a href="#" className="hover:text-blue transition-colors">Sobre</a>
          <a href="#" className="hover:text-blue transition-colors">Contato</a>
          <a href="#" className="hover:text-blue transition-colors">Privacidade</a>
        </div>
        <p className="font-body text-[10px] text-text-light">&copy; {new Date().getFullYear()} EA Air — Esthetic Aligner. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
