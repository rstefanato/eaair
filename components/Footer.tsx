import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-off-white px-5 py-8 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[600px] text-center lg:max-w-[1100px] lg:flex lg:items-center lg:justify-between lg:text-left">
        <Image src="/images/ea-logo.png" alt="EA Esthetic Aligner" width={150} height={33} className="mx-auto mb-4 lg:mx-0 lg:mb-0" />
        <div className="mb-4 flex items-center justify-center gap-6 font-body text-xs text-text-mid lg:mb-0 lg:gap-8 lg:text-sm">
          <a href="#" className="hover:text-blue transition-colors">Sobre</a>
          <a href="#" className="hover:text-blue transition-colors">Contato</a>
          <a href="#" className="hover:text-blue transition-colors">Privacidade</a>
        </div>
        <p className="font-body text-[10px] text-text-light lg:text-xs">&copy; {new Date().getFullYear()} EA Air — Esthetic Aligner</p>
      </div>
    </footer>
  );
}
