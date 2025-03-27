import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import { PendingForm } from '@/components/pending-form';
import { useGetPendings } from '@/http/generated/api';
import dayjs from 'dayjs';

export function Pending() {
  const { data: pending } = useGetPendings();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!pending) return null;

  const formattedDate = dayjs(pending[0].createdAt).format('YYYY-MM-DD');

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Painel de Pendências" />
      {/* Desktop Sidebar com redimensionamento */}
      <div className="hidden md:flex">
        <Sidebar />
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
            <Sidebar />
            <div className="p-2">
              <Link to="/pendencias">
                <button
                  type="submit"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 border rounded"
                >
                  Fechar
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-y-auto w-full">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-6 bg-gray-50 overflow-y-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Painel de Pendências
          </h1>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Adicionar Nova Pendência
            </h2>
            <PendingForm />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Lista de Pendências
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Motivo do Chamado</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="max-w-xs">Descrição</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pending.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.client}</TableCell>
                      <TableCell>{item.callReason}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.priority}</TableCell>
                      <TableCell>
                        {dayjs(item.createdAt).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>{item.responsible}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {item.description}
                      </TableCell>
                      <TableCell>
                        <Link to={`/pendencias/${item.id}`}>
                          <Eye className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
