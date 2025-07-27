'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Wallet } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useContractFilters } from '../-context/contract-filter-context';
import { useDashboardContext } from '../-context/dashboard-filter-context';
import { useDashboardTab } from '../-context/data-tabs-context';
import { useNegotiationFiltersContext } from '../-context/negotiation-filter-context';

export function FilterWallet() {
  const { isWalletActive, toggleWallet } = useDashboardContext();
  const { tab } = useDashboardTab(); // ← agora vem daqui
  const { setFilters: setNegotiationFilters, resetFilters: resetNegotiation } =
    useNegotiationFiltersContext();
  const { setFilters: setContractFilters, resetFilters: resetContract } =
    useContractFilters();

  const handleClick = () => {
    const willBeActive = !isWalletActive;

    toggleWallet();

    if (tab === 'negotiation') {
      willBeActive
        ? setNegotiationFilters({ status: ['ganho'] })
        : resetNegotiation();
    } else if (tab === 'contracts') {
      willBeActive
        ? setContractFilters({ status: ['ativo'] })
        : resetContract();
    }
  };

  useEffect(() => {
    if (!isWalletActive) return;

    if (tab === 'negotiation') {
      setNegotiationFilters({ status: ['ganho'] });
    } else if (tab === 'contracts') {
      setContractFilters({ status: ['ativo'] });
    }
  }, [tab, isWalletActive]);

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
