'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { formatCurrency } from '@/lib/format-currency';
import { useDashboardProvider } from '../-context/dashboard-context';

const monthNames: Record<string, string> = {
  '01': 'Jan',
  '02': 'Fev',
  '03': 'Mar',
  '04': 'Abr',
  '05': 'Mai',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Ago',
  '09': 'Set',
  '10': 'Out',
  '11': 'Nov',
  '12': 'Dez',
};

function formatMonthLabel(monthYear: string) {
  const [month, year] = monthYear.split('/');
  return `${monthNames[month.padStart(2, '0')]}/${year}`;
}

export function DashboardChart() {
  const { viewType, selectedData, lastSixMonthsData } = useDashboardProvider();

  function sortByMonth(data: { month: string; value: number }[]) {
    return data.sort((a, b) => {
      const [ma, ya] = a.month.split('/').map(Number);
      const [mb, yb] = b.month.split('/').map(Number);
      return ya !== yb ? ya - yb : ma - mb;
    });
  }

  const chartData = useMemo(() => {
    const baseData =
      viewType === 'selected' && selectedData.length > 1
        ? selectedData
        : lastSixMonthsData;
    return sortByMonth([...baseData]);
  }, [viewType, selectedData, lastSixMonthsData]);

  return (
    <motion.div
      key={viewType}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d946ef" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />

          <XAxis
            dataKey="month"
            tick={{
              fill: '#8884d8',
              fontSize: 12,
            }}
            tickFormatter={formatMonthLabel}
            interval="preserveStartEnd"
            minTickGap={20}
          />

          <Tooltip
            contentStyle={{
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              color: '#000000',
            }}
            labelFormatter={label => `Mês: ${formatMonthLabel(label)}`}
            formatter={(value: any) => formatCurrency(value)}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#chart-gradient)"
            fill="url(#chart-gradient)"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
