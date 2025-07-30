'use client';

import { createContext, useContext, useState } from 'react';

interface DashboardFiltersContextType {
  isWalletActive: boolean;
  toggleWallet: () => void;
  statusFilters: string[]; // lista de status selecionados
  toggleStatusFilter: (status: string) => void;
  clearStatusFilters: () => void;
}

const DashboardFiltersContext = createContext<
  DashboardFiltersContextType | undefined
>(undefined);

export function DashboardFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isWalletActive, setIsWalletActive] = useState(false);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);

  function toggleWallet() {
    setIsWalletActive(prev => !prev);
  }

  function toggleStatusFilter(status: string) {
    setStatusFilters(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  }

  function clearStatusFilters() {
    setStatusFilters([]);
  }

  return (
    <DashboardFiltersContext.Provider
      value={{
        isWalletActive,
        toggleWallet,
        statusFilters,
        toggleStatusFilter,
        clearStatusFilters,
      }}
    >
      {children}
    </DashboardFiltersContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardFiltersContext);
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardFiltersProvider'
    );
  }
  return context;
}
