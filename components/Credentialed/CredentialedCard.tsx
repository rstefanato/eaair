import { Phone, MapPin } from "lucide-react";
import { type Dentist, getInitials } from "./credentialed-data";

interface CredentialedCardProps { dentist: Dentist; }

export function CredentialedCard({ dentist }: CredentialedCardProps) {
  return (
    <div className="rounded-[14px] border-[1.5px] border-border bg-off-white p-3.5">
      <div className="mb-2.5 flex items-center gap-2.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-blue-light font-heading text-sm font-bold text-blue">
          {getInitials(dentist.nome)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading text-sm font-semibold text-dark truncate">{dentist.nome}</div>
          <div className="font-body text-[11px] text-text-mid">{dentist.especialidade}</div>
        </div>
      </div>
      <p className="mb-2.5 font-body text-xs leading-snug text-text-mid">
        {dentist.endereco}, {dentist.cidade} - {dentist.estado}
      </p>
      <div className="flex gap-2">
        <a href={`tel:${dentist.telefone}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue px-3 py-2.5 font-heading text-xs font-semibold text-white cursor-pointer">
          <Phone className="h-3.5 w-3.5" />Ligar
        </a>
        <a href={`https://www.google.com/maps/search/${encodeURIComponent(`${dentist.endereco}, ${dentist.cidade} ${dentist.estado}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-light px-3 py-2.5 font-heading text-xs font-semibold text-blue cursor-pointer">
          <MapPin className="h-3.5 w-3.5" />Ver no mapa
        </a>
      </div>
    </div>
  );
}
