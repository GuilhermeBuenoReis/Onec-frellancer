import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { usePartnerStore } from '@/store/partner-store';
import { Helmet } from 'react-helmet';
import { useGetPartners } from '@/http/generated/api';
import { Button } from '@/components/ui/button';

export function Employee() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: partner } = useGetPartners();

  if (!partner) return null;

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Parceiros" />
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleToggleSidebar}
          />
          <div className="relative bg-white w-64 h-full shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="p-4 md:p-6 bg-gray-50 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Parceiros
            </h2>
            <Link to="/rh/parceiros/create">
              <Button className="mb-4 cursor-pointer">Criar parceiro</Button>
            </Link>
          </div>
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
