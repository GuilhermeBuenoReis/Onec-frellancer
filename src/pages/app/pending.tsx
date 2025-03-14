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
import { usePendingIdStore } from '@/store/pending-id-store';

export function Pending() {
  const { id } = usePendingIdStore();

  const { data: pending } = useGetPendings();

  if (!pending) return;

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Painel de Pendências" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 bg-gray-50 overflow-y-auto space-y-6">
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
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell>{item.responsible}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {item.description}
                      </TableCell>
                      <TableCell>
                        <Link to={`/pendencias/${id}`}>
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
