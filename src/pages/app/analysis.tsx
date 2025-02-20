import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Progress } from '@/components/ui/progress';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

interface MonthlyData {
  month: string;
  active: number;
  pending: number;
  inactive: number;
  paid: number;
  unpaid: number;
  immigration: number;
}

interface ContractRecord {
  id: number;
  name: string;
  status: string;
  paid: boolean;
}

export function Analises() {
  const metrics = {
    active: 120,
    pending: 45,
    inactive: 20,
    paid: 130,
    unpaid: 55,
    immigration: 30,
  };

  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [contractRecords, setContractRecords] = useState<ContractRecord[]>([]);

  useEffect(() => {
    setMonthlyData([
      {
        month: 'Jan',
        active: 10,
        pending: 5,
        inactive: 2,
        paid: 12,
        unpaid: 3,
        immigration: 1,
      },
      {
        month: 'Feb',
        active: 12,
        pending: 4,
        inactive: 3,
        paid: 14,
        unpaid: 5,
        immigration: 2,
      },
      {
        month: 'Mar',
        active: 15,
        pending: 6,
        inactive: 4,
        paid: 16,
        unpaid: 4,
        immigration: 3,
      },
      {
        month: 'Apr',
        active: 20,
        pending: 7,
        inactive: 3,
        paid: 22,
        unpaid: 6,
        immigration: 4,
      },
      {
        month: 'May',
        active: 25,
        pending: 8,
        inactive: 5,
        paid: 28,
        unpaid: 7,
        immigration: 5,
      },
      {
        month: 'Jun',
        active: 28,
        pending: 9,
        inactive: 6,
        paid: 30,
        unpaid: 8,
        immigration: 6,
      },
    ]);
    // Simulação de registros individuais de contrato
    setContractRecords([
      { id: 1, name: 'Contrato A', status: 'Ativo', paid: true },
      { id: 2, name: 'Contrato B', status: 'Pendente', paid: false },
      { id: 3, name: 'Contrato C', status: 'Inativo', paid: false },
      { id: 4, name: 'Contrato D', status: 'Pago', paid: true },
      { id: 5, name: 'Contrato E', status: 'Não Pago', paid: false },
    ]);
  }, []);

  const pieData = [
    { name: 'Ativos', value: metrics.active },
    { name: 'Pendentes', value: metrics.pending },
    { name: 'Inativos', value: metrics.inactive },
    { name: 'Pagos', value: metrics.paid },
    { name: 'Não Pagos', value: metrics.unpaid },
  ];

  const COLORS = ['#4facfe', '#34d399', '#facc15', '#60a5fa', '#f87171'];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <main className="p-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Área de Análise Completa
          </h2>

          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">Contratos Ativos</span>
              <span className="text-2xl font-bold text-gray-800">
                {metrics.active}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">Contratos Pendentes</span>
              <span className="text-2xl font-bold text-gray-800">
                {metrics.pending}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">Contratos Inativos</span>
              <span className="text-2xl font-bold text-gray-800">
                {metrics.inactive}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">Contratos Pagos</span>
              <span className="text-2xl font-bold text-gray-800">
                {metrics.paid}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">Contratos Não Pagos</span>
              <span className="text-2xl font-bold text-gray-800">
                {metrics.unpaid}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">
                Contratos em Imigração
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {metrics.immigration}
              </span>
            </div>
          </div>

          {/* Gráfico de Pizza: Distribuição de Contratos */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Distribuição de Contratos
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                      }`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Barras: Tendência Mensal de Contratos */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Tendência Mensal de Contratos
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#4facfe" name="Ativos" />
                <Bar dataKey="pending" fill="#34d399" name="Pendentes" />
                <Bar dataKey="inactive" fill="#facc15" name="Inativos" />
                <Bar dataKey="paid" fill="#60a5fa" name="Pagos" />
                <Bar dataKey="unpaid" fill="#f87171" name="Não Pagos" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Linha: Tendência de Contratos de Imigração */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Tendência de Contratos de Imigração
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="immigration"
                  stroke="#4facfe"
                  strokeWidth={2}
                  name="Imigração"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tabela de Detalhes dos Contratos utilizando shadcn‑ui Table */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Detalhes dos Contratos
            </h3>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pago</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractRecords.map(record => (
                  <TableRow key={record.id}>
                    <TableCell>{record.id}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.status}</TableCell>
                    <TableCell>{record.paid ? 'Sim' : 'Não'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
