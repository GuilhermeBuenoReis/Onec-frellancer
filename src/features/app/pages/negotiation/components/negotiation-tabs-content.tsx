'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Suspense } from 'react';
import { SkeletonTable } from '../../../../../skeleton/skeleton-table';
import { ContractTableFromAPI } from './tables/contract-table-from-API';
import { NegotiationTableFromAPI } from './tables/negotiation-table-from-API';

interface NegotiationTabsContentProps {
  activeTab: 'negotiation' | 'contracts';
  setActiveTab: (value: 'negotiation' | 'contracts') => void;
}

export function NegotiationTabsContent({
  activeTab,
}: NegotiationTabsContentProps) {
  return (
    <div className="w-full">
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === 'negotiation' && (
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

          {activeTab === 'contracts' && (
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
