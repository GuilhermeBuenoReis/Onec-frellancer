import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { usePartnerStore, type Partner } from '@/store/partner-store';

export function Employee() {
  const { partners } = usePartnerStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 bg-gray-50 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Parceiros
          </h2>
          {partners.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner: Partner) => (
                <li key={partner.id}>
                  <Link
                    to={`/rh/parceiros/${partner.id}`}
                    className="block bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 p-4"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 flex-shrink-0 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                        {partner.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {partner.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              Nenhum parceiro cadastrado. Cadastre um novo parceiro para
              começar.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
