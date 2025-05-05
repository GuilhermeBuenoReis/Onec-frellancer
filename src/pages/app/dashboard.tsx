import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetContract } from '@/http/generated/api';

const CONTRACT_COLORS: Record<string, string> = {
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

export function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetContract();

  const contracts = data ?? [];
  const totalPages = 1; // Atualize se sua API retornar paginação

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  if (isLoading || !contracts) return <div>Loading...</div>;

  const statusCounts = contracts.reduce(
    (acc, c) => {
      const status = c.status || 'Desconhecido';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const pieData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));
  const totalContracts = pieData.reduce((sum, d) => sum + d.value, 0);

  const yearCounts = contracts.reduce(
    (acc, c) => {
      const year = c.year || 'Unknown';
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const barData = Object.entries(yearCounts).map(([year, count]) => ({
    year,
    count,
  }));

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleSidebar}
          />
          <div className="relative bg-white w-64 h-full shadow-xl">
            <Sidebar />
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="p-4 md:p-8 overflow-y-auto">
          <Helmet title="Dashboard" />
          <section className="bg-white rounded-2xl shadow-xl p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Controle de Contratos
              </h1>
              <Button variant="default" className="px-6 py-2 text-lg">
                Novo Contrato
              </Button>
            </div>
            <Tabs defaultValue="chart">
              <TabsList>
                <TabsTrigger value="chart">Gráficos</TabsTrigger>
                <TabsTrigger value="table">Tabela</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <h2 className="text-center text-xl font-semibold mb-4">
                      Distribuição de Status
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={3}
                          label
                        >
                          {pieData.map(entry => (
                            <Cell
                              key={entry.name}
                              fill={CONTRACT_COLORS[entry.name] || '#ccc'}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          iconSize={12}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                  <Card className="p-6">
                    <h2 className="text-center text-xl font-semibold mb-4">
                      Contratos por Ano
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={barData}
                        margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
                      >
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count">
                          {barData.map((entry, idx) => (
                            <Cell
                              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                              key={idx}
                              fill={CONTRACT_COLORS[entry.year] || '#8884d8'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>
                <Card className="p-6 mt-6 text-center">
                  <p className="text-gray-600 mb-2">Total de Contratos</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {totalContracts}
                  </p>
                </Card>
              </TabsContent>
              <TabsContent value="table">
                <div className="overflow-x-auto">
                  <Table className="min-w-full text-sm">
                    <TableHead>
                      <TableRow>
                        {[
                          'Cidade',
                          'Estado',
                          'Cliente',
                          'CNPJ',
                          'Ano',
                          'Status',
                          'Ações',
                        ].map(header => (
                          <TableCell
                            key={header}
                            className="font-semibold text-gray-600 whitespace-nowrap"
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contracts.map(contract => (
                        <TableRow
                          key={contract.id}
                          className="hover:bg-gray-50"
                        >
                          <TableCell className="max-w-[120px] truncate">
                            {contract.city}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {contract.state}
                          </TableCell>
                          <TableCell className="max-w-[150px] truncate">
                            {contract.client}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {contract.cnpj}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {contract.year}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {contract.status}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() =>
                                navigate(`/contract/${contract.id}`)
                              }
                            >
                              Ver
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </div>
  );
}
