'use client';

import { motion } from 'framer-motion';
import { useLocation } from 'react-router';

interface DashboardTotalsProps {
  data: { month: string; value: number }[];
  infoType: string;
}

export function DashboardTotals({ data, infoType }: DashboardTotalsProps) {
  const { search } = useLocation();
  return (
    <motion.div
      key={search}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm text-muted-foreground overflow-hidden"
    >
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="font-semibold">{item.month}</span>
          <span>
            {infoType === 'feePercentage'
              ? `${item.value.toFixed(2)}%`
              : item.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 2,
                })}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
