import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Sidebar } from '@/components/sidebar';
import { useGetClientReceipt } from '@/http/generated/api';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

// Função para converter "YYYY-MM-DD" em Date ou null
function parseDate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function ClientsDashboard() {
  const { data: clientReceipt, isLoading } = useGetClientReceipt();
  const clients = clientReceipt || [];

  // Estados dos filtros
  const [searchClient, setSearchClient] = useState('');
  const [searchCNPJ, setSearchCNPJ] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'Todos' | 'Pago' | 'Não Pago'
  >('Todos');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [summaryPage, setSummaryPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageSize = 10;
  const maxPageButtonsDetailed = 10;
  const maxPageButtonsSummary = 5;

  // 1) Filtrar pelo estado: clientName, cnpj, status, intervalo de datas
  const filtered = useMemo(() => {
    return clients.filter(c => {
      const name = c.clientName ?? '';
      const cnpj = c.cnpj ?? '';
      const status = c.status ?? '';
      const receiptDate = c.receiptDate ?? '';

      // Filtro por nome do cliente
      const clientMatch = name
        .toLowerCase()
        .includes(searchClient.trim().toLowerCase());

      // Filtro por CNPJ
      const cnpjMatch = cnpj.includes(searchCNPJ.trim());

      // Filtro por status (Pago / Não Pago)
      const statusMatch = filterStatus === 'Todos' || status === filterStatus;

      // Filtro por intervalo de datas: receiptDate está no formato "DD/MM/YYYY"
      let dateMatch = true;
      if (dateFrom && receiptDate) {
        const from = parseDate(dateFrom);
        const [d1, m1, y1] = receiptDate.split('/').map(Number);
        const receipt = new Date(y1, m1 - 1, d1);
        if (from && receipt < from) dateMatch = false;
      }
      if (dateTo && receiptDate) {
        const to = parseDate(dateTo);
        const [d2, m2, y2] = receiptDate.split('/').map(Number);
        const receipt = new Date(y2, m2 - 1, d2);
        if (to && receipt > to) dateMatch = false;
      }

      return (
        (searchClient ? clientMatch : true) &&
        (searchCNPJ ? cnpjMatch : true) &&
        statusMatch &&
        (dateFrom || dateTo ? dateMatch : true)
      );
    });
  }, [clients, searchClient, searchCNPJ, filterStatus, dateFrom, dateTo]);

  // 2) Alertar se nenhum registro for encontrado após filtros
  useEffect(() => {
    const hasAnyFilter =
      !!searchClient ||
      !!searchCNPJ ||
      filterStatus !== 'Todos' ||
      !!dateFrom ||
      !!dateTo;
    if (hasAnyFilter && filtered.length === 0) {
      toast.error('Nenhum registro encontrado para os filtros informados.');
    }
  }, [filtered, searchClient, searchCNPJ, filterStatus, dateFrom, dateTo]);

  // 3) Paginação da tabela detalhada
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Janela de 10 páginas para detalhado
  const detailedStartPage = Math.max(
    1,
    currentPage - Math.floor(maxPageButtonsDetailed / 2)
  );
  let detailedEndPage = detailedStartPage + maxPageButtonsDetailed - 1;
  if (detailedEndPage > totalPages) {
    detailedEndPage = totalPages;
  }
  const detailedStart = Math.max(
    1,
    detailedEndPage - maxPageButtonsDetailed + 1
  );
  const detailedPageNumbers: number[] = [];
  for (let i = detailedStart; i <= detailedEndPage; i++) {
    detailedPageNumbers.push(i);
  }

  // 4) Paginação da tabela de resumo (baseada em todos os clientes)
  const summaryTotalPages = Math.max(1, Math.ceil(clients.length / pageSize));
  const summaryData = clients.slice(
    (summaryPage - 1) * pageSize,
    summaryPage * pageSize
  );
  useEffect(() => {
    if (summaryPage > summaryTotalPages) {
      setSummaryPage(1);
    }
  }, [summaryPage, summaryTotalPages]);

  // Janela de 5 páginas para resumo
  const summaryStartPage = Math.max(
    1,
    summaryPage - Math.floor(maxPageButtonsSummary / 2)
  );
  let summaryEndPage = summaryStartPage + maxPageButtonsSummary - 1;
  if (summaryEndPage > summaryTotalPages) {
    summaryEndPage = summaryTotalPages;
  }
  const summaryStart = Math.max(1, summaryEndPage - maxPageButtonsSummary + 1);
  const summaryPageNumbers: number[] = [];
  for (let i = summaryStart; i <= summaryEndPage; i++) {
    summaryPageNumbers.push(i);
  }

  const dataForGraph = filtered.length > 0 ? filtered : clients;
  const { totalPago, totalNaoPago } = useMemo(() => {
    let pago = 0;
    let naoPago = 0;
    dataForGraph.forEach(c => {
      const valor = Number(c.compensationMonth ?? 0);
      if (c.status === 'PAGO') pago += valor;
      if (c.status === 'NÃO PAGO') naoPago += valor;
    });
    return { totalPago: pago, totalNaoPago: naoPago };
  }, [dataForGraph]);

  const pieData = [
    { name: 'Pago', value: totalPago },
    { name: 'Não Pago', value: totalNaoPago },
  ];
  const COLORS = ['#34D399', '#F87171'];

  // 6) Mapeia status para variante do Badge
  function getStatusBadgeVariant(status?: string | null) {
    if (status === 'PAGO') return 'default';
    if (status === 'NÃO PAGO') return 'destructive';
    return 'outline';
  }

  // 7) Exportar para Excel apenas os registros filtrados
  function exportToExcel() {
    const exportData = filtered.map(c => ({
      'Data Recebimento': c.receiptDate ?? '',
      Competência: c.competence ?? '',
      CNPJ: c.cnpj ?? '',
      Cliente: c.clientName ?? '',
      '%': c.percentage ?? '',
      'Compensação (R$)': c.compensationMonth ?? '',
      'Honorários (R$)': c.honorary ?? '',
      'Imposto (R$)': c.tax ?? '',
      Status: c.status ?? '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
    XLSX.writeFile(workbook, 'clientes_filtrados.xlsx');
  }

  if (isLoading) {
    return (
      <div className="w-screen flex items-center justify-center h-screen">
        <p>Carregando clientes...</p>
      </div>
    );
  }

  if (!clientReceipt || clientReceipt.length === 0) {
    return (
      <div className="w-screen flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-medium">
          Não há recebimentos de clientes cadastrados!
        </h1>
        <p className="mt-2">Deseja criar um novo recebimento?</p>
        <Button className="mt-4">Criar novo recebimento</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 space-y-6">
        {/* ===== HEADER E FILTROS ===== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="md:hidden p-2 rounded bg-white shadow"
              onClick={() => setSidebarOpen(o => !o)}
            >
              ☰
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">
              Dashboard de Clientes
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 w-full">
            {/* Filtro: Nome do Cliente */}
            <div className="col-span-1">
              <Input
                placeholder="Buscar nome do cliente"
                value={searchClient}
                onChange={e => {
                  setSearchClient(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>

            {/* Filtro: CNPJ */}
            <div className="col-span-1">
              <Input
                placeholder="Buscar CNPJ"
                value={searchCNPJ}
                onChange={e => {
                  setSearchCNPJ(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>

            {/* Filtro: Status (Pago / Não Pago) */}
            <div className="col-span-1">
              <select
                value={filterStatus}
                onChange={e => {
                  setFilterStatus(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="w-full h-10 border border-gray-300 rounded-md px-2"
              >
                <option value="Todos">Todos</option>
                <option value="Pago">Pago</option>
                <option value="Não Pago">Não Pago</option>
              </select>
            </div>

            {/* Filtro: Data Início */}
            <div className="col-span-1">
              <Input
                type="date"
                value={dateFrom}
                onChange={e => {
                  setDateFrom(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>

            {/* Filtro: Data Fim */}
            <div className="col-span-1">
              <Input
                type="date"
                value={dateTo}
                onChange={e => {
                  setDateTo(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>

            {/* Botões: Buscar e Exportar */}
            <div className="col-span-2 flex items-center gap-2">
              <Button
                variant="outline"
                className="flex-1 flex items-center justify-center"
                onClick={() => {
                  setCurrentPage(1);
                  if (filtered.length === 0) {
                    toast.error('Nenhum registro encontrado.');
                  }
                }}
              >
                <Search className="w-4 h-4 mr-1" />
                Buscar
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex items-center justify-center"
                onClick={exportToExcel}
              >
                Exportar para Excel
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== GRÁFICO DE PIZZA ===== */}
          <section className="lg:col-span-1 space-y-4">
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle>Valor Pago vs Não Pago</CardTitle>
                <CardDescription>
                  Soma de “Compensação” para cada status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={4}
                      label={entry => `R$ ${entry.value.toLocaleString()}`}
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS[idx]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) =>
                        `R$ ${value.toLocaleString()}`
                      }
                    />
                    <Legend verticalAlign="bottom" height={24} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* ===== TABELA DE RESUMO ===== */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle>Clientes (Resumo)</CardTitle>
                <CardDescription>Tabela com paginação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-lg">
                  <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          Cliente
                        </TableHead>
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          Data
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summaryData.map(c => (
                        <TableRow
                          key={c.id}
                          className="bg-white hover:bg-gray-50"
                        >
                          <TableCell className="p-2 text-sm font-medium text-gray-900">
                            {c.clientName ?? ''}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.receiptDate ?? ''}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginação da Tabela de Resumo (janela de 5 páginas) */}
                {summaryTotalPages > 1 && (
                  <div className="mt-4 flex justify-center">
                    <Pagination
                      currentPage={summaryPage}
                      totalPages={summaryTotalPages}
                      onPageChange={p => setSummaryPage(p)}
                    >
                      <PaginationContent className="flex gap-1">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setSummaryPage(p => Math.max(p - 1, 1))
                            }
                            disabled={summaryPage === 1}
                          />
                        </PaginationItem>

                        {summaryPageNumbers.map(num => (
                          <PaginationItem key={num}>
                            <PaginationLink
                              isActive={num === summaryPage}
                              onClick={() => setSummaryPage(num)}
                            >
                              {num}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setSummaryPage(p =>
                                Math.min(p + 1, summaryTotalPages)
                              )
                            }
                            disabled={summaryPage === summaryTotalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* ===== TABELA DETALHADA ===== */}
          <section className="lg:col-span-2">
            <Card className="shadow-md rounded-xl">
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle>Clientes</CardTitle>
                  <CardDescription>Lista detalhada com filtros</CardDescription>
                </div>
                <span className="text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-lg">
                  <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          Data
                        </TableHead>
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          COMP
                        </TableHead>
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          CNPJ
                        </TableHead>
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          Cliente
                        </TableHead>
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          %
                        </TableHead>
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          Compensação
                        </TableHead>
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          Honorários
                        </TableHead>
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          Imposto
                        </TableHead>
                        <TableHead className="p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentData.map((c, i) => (
                        <TableRow
                          key={c.id}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.receiptDate ?? ''}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.competence ?? ''}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.cnpj ?? ''}
                          </TableCell>
                          <TableCell className="p-2 text-sm font-medium text-gray-900">
                            {c.clientName ?? ''}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.percentage ?? ''}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            R${' '}
                            {Number(c.compensationMonth ?? 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            R$ {Number(c.honorary ?? 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            R$ {Number(c.tax ?? 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="p-2 text-xs">
                            <Badge variant={getStatusBadgeVariant(c.status)}>
                              {c.status ?? ''}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {totalPages > 1 && (
                  <div className="mt-4 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={p => setCurrentPage(p)}
                    >
                      <PaginationContent className="flex gap-1">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage(p => Math.max(p - 1, 1))
                            }
                            disabled={currentPage === 1}
                          />
                        </PaginationItem>

                        {detailedPageNumbers.map(num => (
                          <PaginationItem key={num}>
                            <PaginationLink
                              isActive={num === currentPage}
                              onClick={() => setCurrentPage(num)}
                            >
                              {num}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage(p => Math.min(p + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
