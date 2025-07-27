'use client';

import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useGetNegotiation } from '@/generated';
import { useDashboardContext } from '@/pages/_app/business-dashboard/-context/dashboard-filter-context';

const STATUS_COLORS: Record<string, string> = {
  'Em andamento': '#3b82f6',
  Ganho: '#10b981',
  Perdido: '#ef4444',
  'Status não informado': '#9ca3af',
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      className="pointer-events-none"
    >
      {value}
    </text>
  );
};

export function StatusPieChart() {
  const { filters } = useDashboardContext();
  const { data } = useGetNegotiation();
  const negotiations = Array.isArray(data?.data) ? data.data : [];

  const chartData = useMemo(() => {
    const filtered = negotiations.filter(n => {
      const status = n.status?.trim() ?? '';
      const matchStatus =
        !filters.status ||
        filters.status.length === 0 ||
        filters.status.includes(status);
      return matchStatus;
    });

    const counts = filtered.reduce<Record<string, number>>((acc, cur) => {
      const raw = cur.status?.trim().toLowerCase() ?? '';
      let status: string;

      switch (raw) {
        case 'ganho':
          status = 'Ganho';
          break;
        case 'perdido':
          status = 'Perdido';
          break;
        case 'em andamento':
          status = 'Em andamento';
          break;
        case '':
        case undefined:
        case null:
          status = 'Status não informado';
          break;
        default:
          status = cur.status ?? 'Status não informado';
      }

      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([status, value]) => ({
      name: status,
      value,
    }));
  }, [negotiations, filters]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
        <ResponsiveContainer width={250} height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              dataKey="value"
            >
              {chartData.map(entry => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={STATUS_COLORS[entry.name] ?? '#a1a1aa'}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col gap-3">
          {chartData.map(entry => (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: STATUS_COLORS[entry.name] ?? '#a1a1aa',
                }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
