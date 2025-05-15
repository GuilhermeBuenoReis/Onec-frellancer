import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useGetOnePending } from '@/http/generated/api';

export function PendingDetails() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: pending } = id ? useGetOnePending(id) : { data: undefined };

  if (!pending) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Detalhes da Pendência" />
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="w-2 cursor-col-resize bg-gray-300" />
      </div>
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative bg-white w-64 h-full shadow-lg">
            <Sidebar
              isOpen={sidebarOpen}
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="p-2">
              <Button onClick={() => setSidebarOpen(false)} variant="outline">
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-6 bg-gray-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <Link to="/pendencias">
              <Button variant="ghost" className="flex items-center mb-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {pending.client}
                  </h1>
                  <p className="text-sm text-gray-500">ID: {pending.id}</p>
                </div>
                <div>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      pending.status === 'Aberto'
                        ? 'bg-green-100 text-green-800'
                        : pending.status === 'Concluído'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {pending.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Motivo do Chamado
                  </h2>
                  <p className="text-gray-600">{pending.callReason}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Prioridade
                  </h2>
                  <p className="text-gray-600">{pending.priority}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Responsável
                  </h2>
                  <p className="text-gray-600">{pending.responsible}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Categoria
                  </h2>
                  <p className="text-gray-600">{pending.category}</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Descrição
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {pending.description}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
