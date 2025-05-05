import { useState, useEffect, useMemo } from 'react';
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
import { useGetNegotiation } from '@/http/generated/api';
import { FinancialDetails } from '@/components/finance-datails';
import { FinancialCharts } from '@/components/financial-charts';
import { Link } from 'react-router-dom';

export function Financas() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: negotiation } = useGetNegotiation();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const allowedStatuses = [
    'Ganho',
    'Em Andamento',
    'Status Não Informado',
    'Perdido',
  ];
  const [filterStatus, setFilterStatus] = useState('');
  const negotiationsData = negotiation || [];

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const filteredNegotiations = useMemo(() => {
    if (filterStatus) {
      return negotiationsData.filter(
        item => item.status?.toLowerCase() === filterStatus.toLowerCase()
      );
    }
    return negotiationsData;
  }, [negotiationsData, filterStatus]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredNegotiations.length / recordsPerPage);
  }, [filteredNegotiations]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

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
    totalProjects > 0 ? (totalValue / totalProjects).toFixed(2) : '0';

  const statusCountMap: Record<string, number> = {};
  filteredNegotiations.forEach(item => {
    const status = item.status ? item.status.toLowerCase() : 'desconhecido';
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

  useMemo(() => {
    return [...filteredNegotiations].sort(
      (a, b) => (b.value || 0) - (a.value || 0)
    );
  }, [filteredNegotiations]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Finanças" />
      <div className="hidden md:flex">
        <Sidebar />
        <div className="w-2 cursor-col-resize bg-gray-300" />
      </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {allowedStatuses.map(status => (
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
            <Link to="/create-negotiation">
              <Button>Criar</Button>
            </Link>
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
                COLORS={{
                  ganho: '#4CAF50',
                  'em andamento': '#FFC107',
                  'status bão informado': '#9C27B0',
                  perdido: '#F44336',
                }}
                monthlyData={monthlyData}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
