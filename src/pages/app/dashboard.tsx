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

const pieData: PieData[] = [
  { name: 'Ativos', value: 10 },
  { name: 'Finalizados', value: 25 },
  { name: 'Em Andamento', value: 15 },
  { name: 'Em migração', value: 15 },
];

const COLORS = ['#4CAF50', '#F44336', '#FF9800', '#2196F3'];

interface LineData {
  name: string;
  value: number;
}

const lineData: LineData[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export function Dashboard() {
  const { data: contractStatus } = useGetContractStatusCount();

  if (!contractStatus) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Dashboard" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 rounded-l-xl shadow-xl">
        <Header />
        <main className="p-8 overflow-y-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Controle de Contratos
            </h1>
            <StatusCardsInput contractStatus={contractStatus} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Distribuição de Contratos
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                  >
                    {contractStatus.map(item => (
                      <Cell
                        key={`cell-${item.status}`}
                        fill={COLORS[contractStatus.indexOf(item)]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Tendência Mensal
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
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
