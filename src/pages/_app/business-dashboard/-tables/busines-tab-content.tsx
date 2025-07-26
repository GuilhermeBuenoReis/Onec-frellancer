'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Suspense } from 'react';
import { SkeletonTable } from '@/skeleton/skeleton-table';
import { useDashboardTab } from '../-context/data-tabs-context';
import { ContractTableFromAPI } from './contract/table-from-api';
import { NegotiationTableFromAPI } from './negotiation/table-from-api';

export function BusinessTabContent() {
  const { tab } = useDashboardTab();

  return (
    <div className="w-full">
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {tab === 'negotiation' && (
            <motion.div
              key="negotiation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={<SkeletonTable />}>
                <NegotiationTableFromAPI />
              </Suspense>
            </motion.div>
          )}

          {tab === 'contracts' && (
            <motion.div
              key="contracts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={<SkeletonTable />}>
                <ContractTableFromAPI />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
