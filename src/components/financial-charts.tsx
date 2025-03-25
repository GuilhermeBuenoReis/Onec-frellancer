import { Card } from '@/components/ui/card';
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

interface FinancialChartsProps {
  statusData: { status: string; count: number }[];
  COLORS: Record<string, string>;
  monthlyData: { month: string; count: number }[];
}

export function FinancialCharts({
  statusData,
  COLORS,
  monthlyData,
}: FinancialChartsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-full p-4">
      <Card className="flex-1 min-h-[350px] flex flex-col">
        <h3 className="text-xl font-semibold mb-4">Distribuição de Status</h3>
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
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
        </div>
      </Card>
      <Card className="flex-1 min-h-[350px] flex flex-col">
        <h3 className="text-xl font-semibold mb-4">Projetos por Mês</h3>
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
