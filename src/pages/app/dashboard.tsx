import { useState, useMemo, useEffect } from 'react';
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
import * as XLSX from 'xlsx';

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { data, isLoading } = useGetContract();
  const contracts = useMemo(() => [...(data ?? [])].reverse(), [data]);

  const filteredContracts = useMemo(() => {
    if (!search.trim()) return contracts;
    const termo = search.trim().toLowerCase();
    return contracts.filter(
      c =>
        c.client?.toLowerCase().includes(termo) ||
        c.status?.toLowerCase().includes(termo) ||
        c.city?.toLowerCase().includes(termo) ||
        c.state?.toLowerCase().includes(termo)
    );
  }, [contracts, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContracts.length / itemsPerPage)
  );

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredContracts.forEach(c => {
      const key = c.status?.trim() || 'Status não informado';
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredContracts]);

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
    return filteredContracts.slice(start, start + itemsPerPage);
  }, [filteredContracts, page]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const handleSearch = () => {
    setPage(1);
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

  const formatDateString = (value: string | null | undefined) => {
    if (!value) return '-';
    const v = value.trim();
    if (/^\d+$/.test(v)) {
      const num = Number(v);
      const offset = num > 59 ? num - 1 : num;
      const excelEpoch = new Date(Date.UTC(1899, 11, 31));
      excelEpoch.setUTCDate(excelEpoch.getUTCDate() + offset);
      return excelEpoch.toLocaleDateString('pt-BR');
    }
    return v;
  };

  const exportToExcel = () => {
    const exportData = filteredContracts.map(c => ({
      Data: formatDateString(c.year),
      Cidade: c.city ?? '',
      Estado: c.state ?? '',
      Cliente: c.client ?? '',
      CNPJ: c.cnpj ?? '',
      Status: c.status ?? '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contratos');
    // A extensão .xlsx é gerada automaticamente
    XLSX.writeFile(workbook, 'contratos_filtrados.xlsx');
  };

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

          {/* ===== CABEÇALHO COM BUSCA E BOTÕES ===== */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-gray-800">
              Controle de Contratos
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <Input
                  placeholder="Buscar empresa, status, cidade ou estado..."
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
              <Button onClick={exportToExcel} variant="outline">
                Exportar para Excel
              </Button>
            </div>
          </div>

          {/* ===== GRÁFICO DE DISTRIBUIÇÃO DE STATUS ===== */}
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

          {/* ===== TABELA DE CONTRATOS ===== */}
          <Card className="p-8">
            <Tabs defaultValue="table">
              <TabsList>
                <TabsTrigger value="table">Tabela</TabsTrigger>
              </TabsList>
              <TabsContent value="table">
                <div className="overflow-x-auto">
                  <Table className="min-w-full text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Cidade</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>CNPJ</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentContracts.map(c => (
                        <TableRow key={c.id} className="hover:bg-gray-50">
                          <TableCell>{formatDateString(c.year)}</TableCell>
                          <TableCell>{c.city}</TableCell>
                          <TableCell>{c.state}</TableCell>
                          <TableCell className="truncate max-w-xs">
                            {c.client}
                          </TableCell>
                          <TableCell>{c.cnpj}</TableCell>
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
                              onClick={() =>
                                window.location.assign(`/contract/${c.id}`)
                              }
                              aria-label="Ver contrato"
                            >
                              <Eye className="w-5 h-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* ===== PAGINAÇÃO ===== */}
                  <footer className="mt-4 flex justify-center">
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
                  </footer>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </main>
      </div>
    </div>
  );
}
