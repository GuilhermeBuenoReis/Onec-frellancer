import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { useGetContract } from '@/http/generated/api';
import { CreateContractSheet } from '@/components/create-contract';

export function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { data, isLoading } = useGetContract();
  const contracts = [...(data ?? [])].reverse();
  const totalPages = Math.max(1, Math.ceil(contracts.length / itemsPerPage));

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    contracts.forEach(c => {
      const key = c.status?.trim() || 'Status não informado';
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [contracts]);

  const COLORS = [
    '#EF4444',
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EC4899',
  ];

  const currentContracts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return contracts.slice(start, start + itemsPerPage);
  }, [contracts, page]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/tels?query=${encodeURIComponent(search.trim())}`);
    }
  };

  const maxPageButtons = 10;
  const half = Math.floor(maxPageButtons / 2);
  let startPage = Math.max(1, page - half);
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
  const remainingPages = totalPages - endPage;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(v => !v)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(v => !v)} />
        <main className="p-6 overflow-y-auto">
          <Helmet>
            <title>Dashboard</title>
          </Helmet>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-gray-800">
              Controle de Contratos
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
              <CreateContractSheet />
            </div>
          </div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Distribuição de Status</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusCounts}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={4}
                    label
                  >
                    {statusCounts.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
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
                        <TableHead>Cidade</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>CNPJ</TableHead>
                        <TableHead>Ano</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentContracts.map(c => (
                        <TableRow key={c.id} className="hover:bg-gray-50">
                          <TableCell>{c.city}</TableCell>
                          <TableCell>{c.state}</TableCell>
                          <TableCell className="truncate max-w-xs">
                            {c.client}
                          </TableCell>
                          <TableCell>{c.cnpj}</TableCell>
                          <TableCell>{c.year}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                c.status === 'ATIVO'
                                  ? 'bg-green-100 text-green-800'
                                  : c.status === 'MIGRADO'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : c.status === 'AGUARDANDO RECEBER'
                                      ? 'bg-orange-100 text-orange-800'
                                      : c.status === 'FINALIZADO'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {c.status ?? 'Status não informado'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/contract/${c.id}`)}
                              aria-label="Ver contrato"
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
                          <PaginationPrevious
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                          />
                        </PaginationItem>
                        {pageNumbers.map(num => (
                          <PaginationItem key={num}>
                            <PaginationLink
                              onClick={() => setPage(num)}
                              isActive={page === num}
                            >
                              {num}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {remainingPages > 0 && (
                          <PaginationItem>
                            <PaginationEllipsis>
                              +{remainingPages}
                            </PaginationEllipsis>
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                          />
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
