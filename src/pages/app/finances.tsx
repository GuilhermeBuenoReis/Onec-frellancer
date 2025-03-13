// src/pages/Financas.tsx
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { Helmet } from 'react-helmet';

interface FinancialCardData {
  id: number;
  title: string;
  value: string;
  icon: string;
}

const cards: FinancialCardData[] = [
  { id: 1, title: 'Receitas', value: 'R$ 120.000', icon: '💰' },
  { id: 2, title: 'Despesas', value: 'R$ 80.000', icon: '💸' },
  { id: 3, title: 'Lucro', value: 'R$ 40.000', icon: '📈' },
  { id: 4, title: 'Investimentos', value: 'R$ 30.000', icon: '🏦' },
];

const monthlyData = [
  { month: 'Jan', revenue: 15000, expense: 10000 },
  { month: 'Fev', revenue: 18000, expense: 12000 },
  { month: 'Mar', revenue: 20000, expense: 15000 },
  { month: 'Abr', revenue: 22000, expense: 16000 },
  { month: 'Mai', revenue: 21000, expense: 14000 },
  { month: 'Jun', revenue: 23000, expense: 17000 },
  { month: 'Jul', revenue: 24000, expense: 18000 },
  { month: 'Ago', revenue: 25000, expense: 19000 },
  { month: 'Set', revenue: 26000, expense: 20000 },
  { month: 'Out', revenue: 27000, expense: 21000 },
  { month: 'Nov', revenue: 28000, expense: 22000 },
  { month: 'Dez', revenue: 30000, expense: 24000 },
];

const expenseBreakdown = [
  { category: 'Salários', value: 30000 },
  { category: 'Operações', value: 20000 },
  { category: 'Marketing', value: 15000 },
  { category: 'Infraestrutura', value: 10000 },
  { category: 'Outros', value: 5000 },
];

export function Financas() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Finanças" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <main className="p-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Finanças</h2>

          {/* Cards de Indicadores */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {cards.map(card => (
              <Card
                key={card.id}
                title={card.title}
                value={card.value}
                icon={card.icon}
              />
            ))}
          </div>

          {/* Gráfico de Tendência Mensal */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Tendência Mensal
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
                  dataKey="revenue"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  name="Receitas"
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#F44336"
                  strokeWidth={2}
                  name="Despesas"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Distribuição de Despesas */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Distribuição de Despesas
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="category" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#2196F3" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}
