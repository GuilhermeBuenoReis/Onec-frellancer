import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Helmet } from 'react-helmet';
import { useGetContractStatusCount } from '@/http/generated/api';
import { StatusCardsInput } from '@/components/status-card-input';

interface PieData {
  name: string;
  value: number;
}

interface LineData {
  name: string;
  value: number;
}

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

export function Dashboard() {
  const { data: contractStatus } = useGetContractStatusCount();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!contractStatus) {
    return null;
  }

  const formattedData = contractStatus
    .filter(item => item.status !== null)
    .map(item => ({
      name: item.status as string,
      value: item.count,
    }));

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleSidebar}
          />
          <div className="relative bg-white w-64 h-full shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Header com botão para mobile */}
        <Header onToggleSidebar={toggleSidebar} />
        <main className="p-4 md:p-8 overflow-y-auto">
          <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
              Controle de Contratos
            </h1>
            <StatusCardsInput contractStatus={contractStatus} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
                Distribuição de Contratos
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart margin={{ top: -5, right: 20, bottom: 70, left: 20 }}>
                  <Pie
                    data={formattedData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    label={false} // remove os labels internos
                  >
                    {formattedData.map(entry => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={COLORS[entry.name] || '#ccc'}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    wrapperStyle={{ fontSize: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
                Tendência
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#333"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
