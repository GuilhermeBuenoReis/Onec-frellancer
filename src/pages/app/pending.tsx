import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

export function Pending() {
  const { data: pending = [] } = useGetPendings();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(pending.length / recordsPerPage));
  }, [pending]);

  const paginatedPendings = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return pending.slice(startIndex, startIndex + recordsPerPage);
  }, [pending, currentPage]);

  const pageNumbers = useMemo(() => {
    const maxButtons = 10;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  if (!pending) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Painel de Pendências" />
      <div className="hidden md:flex">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="w-2 cursor-col-resize bg-gray-300" />
      </div>
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
              <Link to="/pendencias">
                <Button onClick={() => setSidebarOpen(false)}>Fechar</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-y-auto w-full">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
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
                    <TableHead>Motivo</TableHead>
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
                  {paginatedPendings.map(item => (
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

            <div className="w-full flex justify-center mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              >
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(prev => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ArrowLeft />
                    </Button>
                  </PaginationItem>

                  {pageNumbers.map(num => (
                    <PaginationItem key={num}>
                      <PaginationLink
                        isActive={num === currentPage}
                        onClick={() => setCurrentPage(num)}
                      >
                        {num}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {totalPages > pageNumbers[pageNumbers.length - 1] && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(prev => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      <ArrowRight />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
