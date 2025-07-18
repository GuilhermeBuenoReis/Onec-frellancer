'use client';

import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

interface DashboardChartProps {
  data: { month: string; value: number }[];
}

export function DashboardChart({ data }: DashboardChartProps) {
  console.log('🚀 DashboardChart data:', data);
  return (
    <motion.div
      key={JSON.stringify(data)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, bottom: 0 }}>
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
          <XAxis dataKey="month" hide={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f1f1f', border: 'none' }}
            labelStyle={{ color: '#fff' }}
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
