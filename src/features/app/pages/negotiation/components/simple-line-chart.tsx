'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from '../../../../../components/shared/theme-provider';
import { useNegotiationFilters } from '../../../../../context/negotiation-filter-context';
import { useGetNegotiation } from '../../../../../generated';

export function SimpleLineChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { filters } = useNegotiationFilters();
  const { data } = useGetNegotiation();

  const negotiations = Array.isArray(data?.data) ? data.data : [];

  const filteredData = useMemo(() => {
    return negotiations.filter(item => {
      const date = item.startsDate ? new Date(item.startsDate) : null;
      const statusMatch =
        Array.isArray(filters.status) && filters.status.length > 0
          ? filters.status.includes(item.status)
          : true;
      const startDateMatch = filters.startDate
        ? date && date >= filters.startDate
        : true;
      const endDateMatch = filters.endDate
        ? date && date <= filters.endDate
        : true;
      return statusMatch && startDateMatch && endDateMatch;
    });
  }, [negotiations, filters]);

  const chartData = useMemo(() => {
    const monthlyTotals = new Map<
      string,
      { mes: string; valor: number; dataReal: Date }
    >();

    for (const item of filteredData) {
      try {
        const date = new Date(item.startsDate ?? '');
        if (isNaN(date.getTime())) continue;

        const key = format(date, 'yyyy-MM'); // agrupamento
        const label = format(date, "MMM. 'de' yyyy", { locale: ptBR });

        if (!monthlyTotals.has(key)) {
          monthlyTotals.set(key, {
            mes: label,
            valor: item.value ?? 0,
            dataReal: date,
          });
        } else {
          const existing = monthlyTotals.get(key)!;
          monthlyTotals.set(key, {
            ...existing,
            valor: existing.valor + (item.value ?? 0),
          });
        }
      } catch {}
    }

    return Array.from(monthlyTotals.values()).sort(
      (a, b) => a.dataReal.getTime() - b.dataReal.getTime()
    );
  }, [filteredData]);

  const tickColor = isDark ? '#e5e7eb' : '#111827';

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
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
            labelFormatter={(label: string) => `Mês: ${label}`}
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
