import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { usePartnerStore } from '@/store/partner-store';
import { Helmet } from 'react-helmet';
import { useGetPartners } from '@/http/generated/api';

export function Employee() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { partners } = usePartnerStore();

  const { data: partner } = useGetPartners();

  if (!partner) return null;

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Parceiros" />

      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-gray-200 text-gray-700 rounded"
          type="button"
        >
          ☰
        </button>
      </div>

      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } fixed inset-0 z-40 md:static md:block`}
      >
        <div className="bg-white w-64 h-full shadow-lg md:relative">
          <Sidebar />
          <div className="md:hidden p-2">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 bg-gray-200 text-gray-700 rounded"
              type="button"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="p-4 md:p-6 bg-gray-50 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Parceiros
          </h2>
          {partner.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partner.map(item => (
                <li key={item.id}>
                  <Link
                    to={`/rh/parceiros/${item.id}`}
                    className="block bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 p-4"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 flex-shrink-0 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                        {item.name ? item.name.charAt(0) : ''}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {item.name}
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
