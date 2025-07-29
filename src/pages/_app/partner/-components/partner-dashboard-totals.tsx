'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { formatCurrency } from '@/lib/format-currency';
import { useDashboardProvider } from '../-context/dashboard-context';

export function DashboardTotals() {
  const { lastSixMonthsData, info, totals } = useDashboardProvider();

  return (
    <AnimatePresence mode="wait">
      {totals === 'on' && (
        <motion.div
          key={totals ? 'Ocultar total' : 'Mostrar total'}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm text-muted-foreground overflow-hidden"
        >
          {lastSixMonthsData.map(({ month, value }, index) => {
            const safeValue = Number.isNaN(value) ? 0 : value;
            const display =
              info === 'percentageHonorary'
                ? `${safeValue.toFixed(2)}%`
                : formatCurrency(safeValue);

            return (
              <div key={index} className="flex flex-col items-center">
                <span className="font-semibold">{month}</span>
                <span>{display}</span>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
