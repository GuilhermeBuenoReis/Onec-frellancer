'use client';

import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useGetContract, useGetNegotiation } from '@/generated';
import { useDashboardContext } from '@/pages/_app/business-dashboard/-context/dashboard-filter-context';

const STATUS_COLORS: Record<string, string> = {
  Ganho: '#10B981', // Verde
  Perdido: '#EF4444', // Vermelho
  'Em andamento': '#3B82F6', // Azul
  Ativo: '#0EA5E9', // Azul claro
  'Aguardando cliente': '#EAB308', // Amarelo
  'Aguardando receber': '#EC4899', // Rosa
  Pago: '#22C55E', // Verde mais claro
  Finalizado: '#6366F1', // Azul/roxo
  'Status não informado': '#9CA3AF', // Cinza
  Migrado: '#8B5CF6', // Roxo
  Concluido: '#FACC15', // Amarelo ouro
  Cancelado: '#F97316', // Laranja
};

/**
 * Deixa a primeira letra maiúscula e o resto minúsculo
 */
function formatStatusName(status: string): string {
  const formatted = status
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, match => match.toUpperCase());

  return formatted;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

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
      {`${value} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export function StatusPieChart() {
  const { statusFilters, toggleStatusFilter, clearStatusFilters } =
    useDashboardContext();

  // Busca os dados de negociações e contratos
  const { data: negotiationsData } = useGetNegotiation();
  const { data: contractsData } = useGetContract();

  const negotiations = Array.isArray(negotiationsData?.data)
    ? negotiationsData.data
    : [];
  const contracts = Array.isArray(contractsData?.data)
    ? contractsData.data
    : [];

  const chartData = useMemo(() => {
    // junta negociações e contratos em um único array
    const allItems = [...negotiations, ...contracts];

    const filtered = allItems.filter(item => {
      const status = formatStatusName(item.status ?? '');
      return statusFilters.length === 0 || statusFilters.includes(status);
    });

    const counts = filtered.reduce<Record<string, number>>((acc, cur) => {
      const status = formatStatusName(cur.status ?? 'Status não informado');
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([status, value]) => ({
      name: status,
      value,
    }));
  }, [negotiations, contracts, statusFilters]);

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
                  fill={STATUS_COLORS[entry.name] || '#3F3F46'} // fallback cinza escuro
                  onClick={() => toggleStatusFilter(entry.name)}
                  cursor="pointer"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="text-xs text-blue-500 underline self-end"
            onClick={clearStatusFilters}
          >
            Limpar filtros
          </button>
          {chartData.map(entry => (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: STATUS_COLORS[entry.name] ?? '#a1a1aa',
                }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
