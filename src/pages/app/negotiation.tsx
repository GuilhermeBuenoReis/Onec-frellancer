import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Eye } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';

import { useGetNegotiation } from '@/http/generated/api';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UpdateSheet } from '@/components/update-sheet';
import type { CreateDataNegotiationBody } from '@/http/generated/api';

export function Negotiation() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: negotiations = [] } = useGetNegotiation();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const maxPageButtons = 10;

  const filtered = useMemo(() => {
    return negotiations.filter(
      n =>
        (!filterStatus ||
          n.status?.toLowerCase() === filterStatus.toLowerCase()) &&
        (!search ||
          n.client?.toLowerCase().includes(search.toLowerCase()) ||
          n.status?.toLowerCase().includes(search.toLowerCase()))
    );
  }, [negotiations, filterStatus, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const current = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  const totalProjects = filtered.length;
  const totalValue = filtered.reduce((sum, n) => sum + (n.value || 0), 0);
  const averageValue =
    totalProjects > 0 ? (totalValue / totalProjects).toFixed(2) : '0.00';

  const half = Math.floor(maxPageButtons / 2);
  let startPage = Math.max(1, page - half);
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  const handleSearch = () => setPage(1);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Helmet>
        <title>Finanças</title>
      </Helmet>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(v => !v)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(v => !v)} />
        <main className="p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Financeiro
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <Input
                  placeholder="Buscar empresa ou status..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="px-3 py-2 border-none focus:ring-0 w-60"
                />
                <Button
                  variant="ghost"
                  className="p-2 text-gray-600 hover:bg-gray-100"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              <UpdateSheet<CreateDataNegotiationBody>
                title="Criar Negociação"
                trigger={
                  <Button className="bg-indigo-600 text-white">
                    Negociação
                  </Button>
                }
                formData={{}} // Replace with an appropriate default object or remove this prop if unnecessary
                onChange={() => {}}
                onSubmit={() => {}}
              />
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 text-center">
                <h2 className="text-lg">Projetos</h2>
                <p className="text-2xl font-semibold">{totalProjects}</p>
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg">Valor Total</h2>
                <p className="text-2xl font-semibold">
                  R$ {totalValue.toLocaleString()}
                </p>
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg">Valor Médio</h2>
                <p className="text-2xl font-semibold">R$ {averageValue}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <Tabs defaultValue="table">
              <TabsList>
                <TabsTrigger value="table">Tabela</TabsTrigger>
              </TabsList>
              <TabsContent value="table">
                <div className="overflow-x-auto">
                  <Table className="min-w-full text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data Início</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {current.map(n => (
                        <TableRow key={n.id} className="hover:bg-gray-50">
                          <TableCell>
                            {dayjs(n.startsDate).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell>{n.client}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                n.status === 'Ganho'
                                  ? 'bg-green-100 text-green-800'
                                  : n.status === 'Em Andamento'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : n.status === 'Perdido'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {n.status || 'Status Não Informado'}
                            </span>
                          </TableCell>
                          <TableCell>R$ {n.value?.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/negotiation/${n.id}`)}
                            >
                              <Eye className="w-5 h-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 flex justify-end">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    >
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </Button>
                        </PaginationItem>
                        {pageNumbers.map(num => (
                          <PaginationItem key={num}>
                            <PaginationLink
                              isActive={num === page}
                              onClick={() => setPage(num)}
                            >
                              {num}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {totalPages > endPage && (
                          <PaginationItem>
                            <PaginationEllipsis>...</PaginationEllipsis>
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </main>
      </div>
    </div>
  );
}
