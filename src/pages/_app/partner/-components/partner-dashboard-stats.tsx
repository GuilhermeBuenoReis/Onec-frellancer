'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/format-currency';
import { cn } from '@/lib/utils';
import { useDashboardProvider } from '../-context/dashboard-context';

export function DashboardStat() {
  const { current, previous, info } = useDashboardProvider();

  const currentValue = current?.value ?? 0;
  const previousValue = previous?.value;
  const variation =
    previousValue && previousValue > 0
      ? ((currentValue - previousValue) / previousValue) * 100
      : null;

  const increased = variation !== null && variation >= 0;

  const formattedValue =
    info === 'percentageHonorary'
      ? `${currentValue.toFixed(2)}%`
      : formatCurrency(currentValue);

  return (
    <motion.div
      key={info}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1"
    >
      <p className="text-3xl font-semibold">{formattedValue}</p>
      {variation !== null && (
        <p
          className={cn(
            'text-sm flex items-center gap-1 font-medium',
            increased ? 'text-green-500' : 'text-red-500'
          )}
        >
          {increased ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          {Math.abs(variation).toFixed(2)}%{' '}
          {increased ? 'Comparado ao mês passado!' : 'Abaixo do mês passado!'}
        </p>
      )}
    </motion.div>
  );
}
