'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContractFilters } from '../-context/contract-filter-context';
import { useDashboardContext } from '../-context/dashboard-filter-context';
import { useNegotiationFiltersContext } from '../-context/negotiation-filter-context';

export function FilterWallet() {
  const { isWalletActive, toggleWallet, activeTab } = useDashboardContext();
  const {
    setFilters: setNegotiationFilters,
    resetFilters: resetNegotiationFilters,
  } = useNegotiationFiltersContext();
  const { setFilters: setContractFilters, resetFilters: resetContractFilters } =
    useContractFilters();

  const handleClick = () => {
    const willBeActive = !isWalletActive;

    toggleWallet();

    if (activeTab === 'negotiation') {
      if (willBeActive) {
        setNegotiationFilters({ status: ['ganho'] });
      } else {
        resetNegotiationFilters();
      }
    } else if (activeTab === 'contracts') {
      if (willBeActive) {
        setContractFilters({ status: ['ativo'] });
      } else {
        resetContractFilters();
      }
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={isWalletActive ? 'outline' : 'link'}
      className={`flex gap-2 items-center transition-all duration-200 ${
        isWalletActive
          ? 'border-green-500 text-green-500'
          : 'text-muted-foreground'
      }`}
    >
      <Wallet size={20} />
      Carteira
      <AnimatePresence>
        {isWalletActive && (
          <motion.span
            key="wallet-active"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
