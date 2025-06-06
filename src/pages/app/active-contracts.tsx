import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/sidebar';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useGetNegotiation } from '@/http/generated/api';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import * as XLSX from 'xlsx';

export function ActiveContracts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: allNegotiations = [], isLoading } = useGetNegotiation();

  // Estados para os filtros:
  const [filterClient, setFilterClient] = useState<string>('');
  const [filterStartsDate, setFilterStartsDate] = useState<string>('');

  // 1) Filtrar somente negociações cujo status seja "ativo" ou "ganho"
  const activeNegotiations = useMemo(() => {
    return allNegotiations.filter(item => {
      const status = item.status?.toLowerCase();
      return status === 'ativo' || status === 'ganho';
    });
  }, [allNegotiations]);

  // 2) Filtrar por Cliente e por Data (YYYY-MM-DD)
  const filteredNegotiations = useMemo(() => {
    return activeNegotiations.filter(item => {
      const matchesClient = filterClient
        ? item.client?.toLowerCase().includes(filterClient.toLowerCase())
        : true;

      const matchesDate = filterStartsDate
        ? item.startsDate
          ? new Date(item.startsDate).toISOString().slice(0, 10) ===
            filterStartsDate
          : false
        : true;

      return matchesClient && matchesDate;
    });
  }, [activeNegotiations, filterClient, filterStartsDate]);

  // Dados para os gráficos (Total por mês)
  const chartData = useMemo(() => {
    // Mapeia cada item para { month, amount } e depois agrupa
    const agrupado = filteredNegotiations
      .filter((item): item is typeof item & { startsDate: string } =>
        Boolean(item.startsDate)
      )
      .map(item => {
        const dateObj = new Date(item.startsDate!);
        return {
          month: dateObj.toLocaleString('pt-BR', {
            month: 'short',
            year: 'numeric',
          }),
          amount: item.value ?? 0,
        };
      })
      .reduce((acc: { month: string; amount: number }[], curr) => {
        const encontrado = acc.find(d => d.month === curr.month);
        if (encontrado) {
          encontrado.amount += curr.amount;
        } else {
          acc.push({ month: curr.month, amount: curr.amount });
        }
        return acc;
      }, []);

    return agrupado;
  }, [filteredNegotiations]);

  // Paginação
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredNegotiations.length / itemsPerPage)
  );
  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredNegotiations.slice(start, start + itemsPerPage);
  }, [filteredNegotiations, page]);

  // Cálculo dos botões de página (mostrar no máximo 5 de cada vez)
  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, page - half);
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  // 3) Função para exportar o Excel
  function exportToExcel() {
    // Monta um array de objetos com as colunas que você quer no Excel
    // Ajuste aqui os campos se quiser mais/menos colunas:
    const exportData = filteredNegotiations.map(item => ({
      ID: item.id,
      Cliente: item.client,
      Status: item.status,
      'Data Início': item.startsDate
        ? new Date(item.startsDate).toLocaleDateString('pt-BR')
        : '',
      Valor: item.value != null ? item.value : 0,
    }));

    // Cria uma "worksheet" e adiciona os dados
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    // Cria um "workbook" e insere a planilha
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contratos');

    // Gera o binary e dispara o download
    XLSX.writeFile(workbook, 'contratos_filtrados.xlsx');
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />
      <main className="flex-1 flex flex-col overflow-x-hidden p-8">
        <header className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="text-xl">☰</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">
            Contratos Ativos &amp; Ganhos
          </h1>
        </header>

        {isLoading ? (
          <p>Carregando contratos...</p>
        ) : (
          <>
            {/* ===== FILTROS ===== */}
            <Card className="shadow-lg mb-6">
              <CardHeader>
                <CardTitle>Filtrar Contratos</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {/* Filtro por Cliente */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Cliente
                  </label>
                  <Input
                    type="text"
                    placeholder="Pesquisar cliente"
                    value={filterClient}
                    onChange={e => setFilterClient(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                {/* Filtro por Data */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Data Início
                  </label>
                  <Input
                    type="date"
                    value={filterStartsDate}
                    onChange={e => setFilterStartsDate(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                {/* Botão de Exportar */}
                <div className="flex items-end">
                  <Button onClick={exportToExcel} className="w-full">
                    Transformar para Excel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* ===== GRÁFICOS ===== */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card>
                <CardHeader>
                  <CardTitle>Ganhos Mensais</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) =>
                          `R$ ${value.toLocaleString()}`
                        }
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        name="Rendimento"
                        stroke="#4A90E2"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Ganhos</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) =>
                          `R$ ${value.toLocaleString()}`
                        }
                      />
                      <Legend />
                      <Bar dataKey="amount" name="Rendimento" barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </section>

            {/* ===== TABELA E PAGINAÇÃO ===== */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Contratos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                      <TableHead className="text-right">Data</TableHead>
                      <TableHead className="text-right">Valor (R$)</TableHead>
                      <TableHead className="text-right">Ver detalhes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.client}</TableCell>
                        <TableCell className="text-right">
                          {item.status}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.startsDate
                            ? new Date(item.startsDate).toLocaleDateString(
                                'pt-BR'
                              )
                            : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {(item.value ?? 0).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to={`/negotiation/${item.id}`}>
                            <Eye />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <footer className="mt-4 flex justify-center">
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
                          className="cursor-pointer"
                        >
                          <ArrowLeft />
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
                          className="cursor-pointer"
                        >
                          <ArrowRight />
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </footer>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
