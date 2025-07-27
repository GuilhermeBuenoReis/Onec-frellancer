'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface DashboardFilters {
  title?: string;
  client?: string;
  step?: string;
  user?: string;
  tags?: string;
  status?: string[];
  startDate?: Date;
  endDate?: Date;
  activeTab?: 'negotiation' | 'contracts';
  isWalletActive?: boolean;
}

interface DashboardFiltersContextType {
  filters: DashboardFilters;
  setFilters: (filters: DashboardFilters) => void;
  resetFilters: () => void;
  toggleWallet: () => void;
}

const DashboardFiltersContext = createContext<
  DashboardFiltersContextType | undefined
>(undefined);

export function DashboardFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFiltersState] = useState<DashboardFilters>({
    activeTab: 'contracts',
    isWalletActive: false,
    status: [],
  });

  function setFilters(newFilters: DashboardFilters) {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }

  function resetFilters() {
    setFiltersState({
      title: '',
      client: '',
      step: '',
      user: '',
      tags: '',
      status: [],
      startDate: undefined,
      endDate: undefined,
      activeTab: 'contracts',
      isWalletActive: false,
    });
  }

  function toggleWallet() {
    setFiltersState(state => {
      const isNowActive = !state.isWalletActive;

      const isContractTab = state.activeTab === 'negotiation';

      return {
        ...state,
        isWalletActive: isNowActive,
        status: isNowActive
          ? isContractTab
            ? ['ativo', 'Ativo', 'ATIVO']
            : ['ganho', 'Ganho']
          : [],
      };
    });
  }

  useEffect(() => {
    setFiltersState(prev => {
      if (!prev.isWalletActive) return prev;

      const status =
        prev.activeTab === 'negotiation'
          ? ['ganho', 'Ganho']
          : ['ativo', 'Ativo', 'ATIVO'];

      return {
        ...prev,
        status,
      };
    });
  }, [filters.activeTab, filters.isWalletActive]);

  return (
    <DashboardFiltersContext.Provider
      value={{ filters, setFilters, resetFilters, toggleWallet }}
    >
      {children}
    </DashboardFiltersContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardFiltersContext);
  if (!context) {
    throw new Error(
      'useDashboardFilters must be used within a DashboardFiltersProvider'
    );
  }
  return context;
}
