import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function PendingDetails() {
  const { id } = useParams();

  const pending = {
    id,
    cliente: 'Cliente Exemplo',
    motivo: 'Problema com o sistema',
    status: 'Aberto',
    prioridade: 'Alta',
    criadoEm: '20/03/2025',
    atualizadoEm: '20/03/2025',
    responsavel: 'João da Silva',
    categoria: 'SAC',
    descricao:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Detalhes da Pendência" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 bg-gray-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <Link to="/pendencias">
              <Button variant="ghost" className="flex items-center mb-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {pending.cliente}
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
                  <p className="text-gray-600">{pending.motivo}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Prioridade
                  </h2>
                  <p className="text-gray-600">{pending.prioridade}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Responsável
                  </h2>
                  <p className="text-gray-600">{pending.responsavel}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Categoria
                  </h2>
                  <p className="text-gray-600">{pending.categoria}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Criado em
                  </h2>
                  <p className="text-gray-600">{pending.criadoEm}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    Atualizado em
                  </h2>
                  <p className="text-gray-600">{pending.atualizadoEm}</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Descrição
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {pending.descricao}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
