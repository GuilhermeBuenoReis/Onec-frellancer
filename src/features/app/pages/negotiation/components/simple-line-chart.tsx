import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../../../../components/shared/theme-provider';

const rendimentoPorMes = [
  { mes: 'abr/2023', valor: 150000 },
  { mes: 'mai/2023', valor: 0 },
  { mes: 'jun/2023', valor: 50000 },
  { mes: 'out/2023', valor: 300000 },
  { mes: 'dez/2023', valor: 0 },
  { mes: 'mar/2024', valor: 120000 },
  { mes: 'abr/2024', valor: 60000 },
  { mes: 'jun/2024', valor: 0 },
  { mes: 'out/2024', valor: 100000 },
  { mes: 'mai/2025', valor: 2000000 },
  { mes: 'jun/2025', valor: 300000 },
  { mes: 'jul/2025', valor: 80000 },
  { mes: 'ago/2025', valor: 0 },
  { mes: 'nov/2025', valor: 100000 },
];

export function SimpleLineChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tickColor = isDark ? '#e5e7eb' : '#111827';

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={rendimentoPorMes}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#4b5563' : '#d1d5db'}
          />
          <XAxis
            dataKey="mes"
            tick={{ fill: tickColor, fontSize: 12 }}
            interval="preserveStartEnd"
            minTickGap={20}
          />
          <YAxis
            tick={{ fill: tickColor, fontSize: 12 }}
            tickCount={5}
            domain={[0, 'auto']}
            tickFormatter={value =>
              `R$ ${value.toLocaleString('pt-BR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}`
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#fff',
              border: '1px solid #ccc',
              borderRadius: 4,
              color: isDark ? '#f9fafb' : '#111827',
              fontSize: '0.875rem',
            }}
            formatter={(value: number) =>
              `R$ ${value.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}`
            }
          />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4, fill: '#3b82f6' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
