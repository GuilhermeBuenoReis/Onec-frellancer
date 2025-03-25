import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { Sidebar } from '@/components/sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { FinancialDetails } from '@/components/finance-datails';
import { FinancialCharts } from '@/components/financial-charts';

export function Financas() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: negotiation } = useGetNegotiation();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [filterStatus, setFilterStatus] = useState('');
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

  const COLORS: Record<string, string> = {
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

  const sortedNegotiations = useMemo(() => {
    return [...filteredNegotiations].sort(
      (a, b) => (b.value || 0) - (a.value || 0)
    );
  }, [filteredNegotiations]);

  const totalPages = Math.ceil(filteredNegotiations.length / recordsPerPage);

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Finanças" />
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
        <div className="w-2 cursor-col-resize bg-gray-300" />
      </div>
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleToggleSidebar}
          />
          <div className="relative bg-white w-64 h-full shadow-lg">
            <Sidebar />
            <div className="p-2">
              <Button onClick={handleToggleSidebar} variant="outline">
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-y-auto w-full">
        <main className="w-full p-4 md:p-6 bg-gray-50 space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard Financeiro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold">Projetos</h3>
                <p className="text-2xl">{totalProjects}</p>
                <span className="badge badge-secondary">
                  {filterStatus || 'Todos'}
                </span>
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
              <FinancialDetails
                paginatedData={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </TabsContent>
            <TabsContent value="charts">
              <FinancialCharts
                statusData={statusData}
                COLORS={COLORS}
                monthlyData={monthlyData}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
