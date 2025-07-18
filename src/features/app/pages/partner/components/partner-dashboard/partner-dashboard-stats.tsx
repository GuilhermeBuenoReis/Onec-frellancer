'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../../../../../../lib/utils';

interface DashboardStatProps {
  current: number;
  previous: number;
  infoType: string;
}

export function DashboardStat({
  current,
  previous,
  infoType,
}: DashboardStatProps) {
  const difference = current - previous;
  const variation = previous > 0 ? (difference / previous) * 100 : 0;
  const increased = variation > 0;

  return (
    <motion.div
      key={infoType}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1"
    >
      <p className="text-3xl font-semibold">
        {current.toLocaleString('pt-BR', {
          style: infoType === 'feePercentage' ? undefined : 'currency',
          currency: 'BRL',
          maximumFractionDigits: 2,
        })}
      </p>
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
        {Math.abs(variation).toFixed(2)}% Comparado ao mês passado!
      </p>
    </motion.div>
  );
}
