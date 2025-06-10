import { Link } from 'react-router-dom';
import type { IPartner } from '@/domain/Partner/IPartner';

export function PartnerCard({ partner }: { partner: IPartner }) {
  const initial = partner.name?.charAt(0).toUpperCase() ?? '';
  return (
    <Link
      to={`/rh/parceiros/${partner.id}`}
      className="block bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 p-4"
    >
      <div className="flex items-center">
        <div className="w-12 h-12 flex-shrink-0 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
          {initial}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {partner.name ?? 'Nome não informado!'}
          </h3>
        </div>
      </div>
    </Link>
  );
}
