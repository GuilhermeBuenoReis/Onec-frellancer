// src/pages/PartnerDashboard.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

interface SaleRecord {
  date: string;
  sales: number;
}

interface ImigRecord {
  date: string;
  contracts: number;
}

function fetchSalesDataForPartner(partnerId: number): Promise<SaleRecord[]> {
  // Simulação de dados: se partnerId for 1 (por exemplo, Jorgin), retorna dados
  if (partnerId === 1) {
    return Promise.resolve([
      { date: 'Jan', sales: 120 },
      { date: 'Feb', sales: 200 },
      { date: 'Mar', sales: 150 },
      { date: 'Apr', sales: 250 },
      { date: 'May', sales: 300 },
      { date: 'Jun', sales: 280 },
    ]);
  }
  return Promise.resolve([]);
}

export function PartnerDashboard() {
  const params = useParams<{ id: string }>();
  const partnerId = params.id ? Number.parseInt(params.id, 10) : Number.NaN;
  const [salesData, setSalesData] = useState<SaleRecord[]>([]);
  const [imigData, setImigData] = useState<ImigRecord[]>([]);

  useEffect(() => {
    // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
    if (!isNaN(partnerId)) {
      fetchSalesDataForPartner(partnerId).then(data => {
        setSalesData(data);
      });
      fetchSalesDataForPartner(partnerId).then(data => setImigData(data));
    }
  }, [partnerId]);

  // Cálculos para vendas
  const totalSales = salesData.reduce((acc, record) => acc + record.sales, 0);
  const avgSales = salesData.length
    ? Math.round(totalSales / salesData.length)
    : 0;
  const bestMonth = salesData.reduce(
    (prev, current) => (prev.sales > current.sales ? prev : current),
    { date: '', sales: 0 } as SaleRecord
  );

  // Cálculos para contratos de imigração
  const totalImig = imigData.reduce((acc, record) => acc + record.contracts, 0);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 bg-gray-50 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Dashboard de Vendas do Parceiro: {partnerId}
          </h2>
          {/* Resumo de Métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">Total de Vendas</span>
              <span className="text-2xl font-bold text-gray-800">
                {totalSales}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">Média Mensal</span>
              <span className="text-2xl font-bold text-gray-800">
                {avgSales}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">Melhor Mês</span>
              <span className="text-2xl font-bold text-gray-800">
                {bestMonth.date}
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-gray-500 text-sm">
                Contratos em Imigração
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {totalImig}
              </span>
            </div>
          </div>
          {/* Gráfico de Linha para Vendas */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Tendência Mensal (Linha)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#4facfe"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Gráfico de Barras para Vendas */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Tendência Mensal (Barras)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#4facfe" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Gráfico Fino para Contratos em Imigração */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Tendência de Contratos de Imigração
            </h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={imigData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="contracts"
                  stroke="#4facfe"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}
