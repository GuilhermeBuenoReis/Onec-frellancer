'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface NegotiationFilters {
  title?: string;
  client?: string;
  step?: string;
  user?: string;
  tags?: string;
  status?: string[];
  startDate?: Date;
  endDate?: Date;
  activeTab?: 'negotiation' | 'contract';
  isWalletActive?: boolean;
}

interface DashboardFiltersContextType {
  filters: NegotiationFilters;
  setFilters: (filters: NegotiationFilters) => void;
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
  const [filters, setFiltersState] = useState<NegotiationFilters>({
    activeTab: 'negotiation',
    isWalletActive: false,
    status: [],
  });

  function setFilters(newFilters: NegotiationFilters) {
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
      activeTab: 'negotiation',
      isWalletActive: false,
    });
  }

  function toggleWallet() {
    setFiltersState(prev => {
      const isNowActive = !prev.isWalletActive;
      return {
        ...prev,
        isWalletActive: isNowActive,
        status: isNowActive
          ? prev.activeTab === 'negotiation'
            ? ['ganho']
            : ['ativo']
          : [],
      };
    });
  }

  useEffect(() => {
    setFiltersState(prev => {
      if (prev.isWalletActive) {
        return {
          ...prev,
          status: prev.activeTab === 'negotiation' ? ['ganho'] : ['ativo'],
        };
      }
      return prev;
    });
  }, [filters.activeTab]);

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
      'useNegotiationFilters must be used within a NegotiationFiltersProvider'
    );
  }
  return context;
}
