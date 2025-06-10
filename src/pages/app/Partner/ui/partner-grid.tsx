import { PartnerCard } from './partner-card';
import type { IPartner } from '@/domain/Partner/IPartner';

export function PartnerGrid({ partners }: { partners: IPartner[] }) {
  if (partners.length === 0) {
    return (
      <p className="text-gray-600">
        Nenhum parceiro cadastrado. Cadastre um novo parceiro para começar.
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {partners.map(p => (
        <li key={p.id}>
          <PartnerCard partner={p} />
        </li>
      ))}
    </ul>
  );
}
