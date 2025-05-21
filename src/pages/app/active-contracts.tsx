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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function ActiveContracts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: allNegotiations = [], isLoading } = useGetNegotiation();

  // Normalize status for case-insensitive matching
  const activeNegotiations = allNegotiations.filter(item => {
    const status = item.status?.toLowerCase();
    return status === 'ativo' || status === 'ganho';
  });

  const chartData = useMemo(() => {
    return activeNegotiations
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
        const found = acc.find(d => d.month === curr.month);
        if (found) {
          found.amount += curr.amount;
        } else {
          acc.push({ month: curr.month, amount: curr.amount });
        }
        return acc;
      }, []);
  }, [activeNegotiations]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(activeNegotiations.length / itemsPerPage)
  );
  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return activeNegotiations.slice(start, start + itemsPerPage);
  }, [activeNegotiations, page]);

  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, page - half);
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
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
            Contratos Ativos & Ganhos
          </h1>
        </header>

        {isLoading ? (
          <p>Carregando contratos...</p>
        ) : (
          <>
            {/* Gráficos */}
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

            {/* Tabela com paginação */}
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
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
