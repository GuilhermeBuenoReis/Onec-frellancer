import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useGetNegotiation } from '@/http/generated/api';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from 'recharts';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';

export function Financas() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: negotiation } = useGetNegotiation();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [filterStatus, setFilterStatus] = useState('');

  // Evite o early return. Use um valor padrão (array vazio) enquanto os dados não chegam.
  const negotiationsData = negotiation || [];

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const filteredNegotiations = useMemo(() => {
    return filterStatus
      ? negotiationsData.filter(item => item.status === filterStatus)
      : negotiationsData;
  }, [negotiationsData, filterStatus]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return filteredNegotiations.slice(startIndex, startIndex + recordsPerPage);
  }, [filteredNegotiations, currentPage]);

  const totalProjects = filteredNegotiations.length;
  const totalValue = filteredNegotiations.reduce(
    (acc, cur) => acc + (cur.value || 0),
    0
  );
  const averageValue =
    totalProjects > 0 ? (totalValue / totalProjects).toFixed(2) : 0;
  const completedProjects = filteredNegotiations.filter(
    item => item.status === 'CONCLUIDO'
  ).length;
  const progressPercent =
    totalProjects > 0
      ? Math.round((completedProjects / totalProjects) * 100)
      : 0;

  const statusCountMap: Record<string, number> = {};
  filteredNegotiations.forEach(item => {
    const status = item.status || 'Desconhecido';
    statusCountMap[status] = (statusCountMap[status] || 0) + 1;
  });
  const statusData = Object.keys(statusCountMap).map(status => ({
    status,
    count: statusCountMap[status],
  }));

  const COLORS = {
    CONCLUIDO: '#4CAF50',
    CANCELADO: '#F44336',
    FINALIZADO: '#2196F3',
    'AGUARDANDO RECEBER': '#FFC107',
    PAGO: '#9C27B0',
    PERDIDO: '#795548',
    ATIVO: '#00BCD4',
    MIGRADO: '#FF9800',
    Desconhecido: '#808080',
  };

  const monthlyCountMap: Record<string, number> = {};
  filteredNegotiations.forEach(item => {
    const date = dayjs(item.startsDate || '1970-01-01');
    const month = date.format('MMM');
    monthlyCountMap[month] = (monthlyCountMap[month] || 0) + 1;
  });

  const monthlyData = Object.keys(monthlyCountMap)
    .map(month => ({ month, count: monthlyCountMap[month] }))
    .sort(
      (a, b) => dayjs(a.month, 'MMM').month() - dayjs(b.month, 'MMM').month()
    );

  const sortedNegotiations = useMemo(() => {
    return [...filteredNegotiations].sort(
      (a, b) => (b.value || 0) - (a.value || 0)
    );
  }, [filteredNegotiations]);

  const totalPages = Math.ceil(filteredNegotiations.length / recordsPerPage);

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Finanças" />

      {/* Botão para abrir o Sidebar em telas mobile */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-gray-200 text-gray-700 rounded"
          type="button"
        >
          ☰
        </button>
      </div>

      {/* Sidebar: overlay mobile ou fixo em desktop */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } fixed inset-0 z-40 md:static md:block`}
      >
        <div className="bg-white w-64 h-full shadow-lg md:relative">
          <Sidebar />
          <div className="md:hidden p-2">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 bg-gray-200 text-gray-700 rounded"
              type="button"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Passando a prop onToggleSidebar para o Header */}
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="p-4 md:p-6 bg-gray-50 space-y-8 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard Financeiro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold">Projetos</h3>
                <p className="text-2xl">{totalProjects}</p>
                <Badge variant="secondary">{filterStatus || 'Todos'}</Badge>
              </div>
            </Card>
            <Card>
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold">Valor Total</h3>
                <p className="text-2xl">R$ {totalValue.toLocaleString()}</p>
              </div>
            </Card>
            <Card>
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold">Valor Médio</h3>
                <p className="text-2xl">R$ {averageValue}</p>
              </div>
            </Card>
            <Card>
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold">Concluídos</h3>
                <p className="text-2xl">{completedProjects}</p>
                <Progress value={progressPercent} className="w-full mt-2" />
                <span className="text-sm mt-1">{progressPercent}%</span>
              </div>
            </Card>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Filtrar por Status</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setFilterStatus('');
                    setCurrentPage(1);
                  }}
                >
                  Todos
                </DropdownMenuItem>
                {Object.keys(COLORS).map(status => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => {
                      setFilterStatus(status);
                      setCurrentPage(1);
                    }}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Top 5 Projetos</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Top 5 Projetos por Valor</DialogTitle>
                  <DialogDescription>
                    Confira os projetos com maior valor.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 mt-4">
                  {sortedNegotiations.slice(0, 5).map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <span>{item.title || 'Título não definido'}</span>
                      <span className="font-bold">
                        R$ {item.value?.toLocaleString() || '0'}
                      </span>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="charts">Gráficos</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <div className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Título</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Data Início</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedData.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>
                            {item.title || 'Título não definido'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {item.status || 'Desconhecido'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            R$ {item.value?.toLocaleString() || '0'}
                          </TableCell>
                          <TableCell>
                            {dayjs(item.startsDate).format('DD/MM/YYYY')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between items-center p-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage(prev => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <span>
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage(prev => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </Button>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="charts">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-xl font-semibold mb-4">
                    Distribuição de Status
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {statusData.map(entry => (
                          <Cell
                            key={`cell-${entry.status}`}
                            fill={COLORS[entry.status] || '#ccc'}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
                <Card>
                  <h3 className="text-xl font-semibold mb-4">
                    Projetos por Mês
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
