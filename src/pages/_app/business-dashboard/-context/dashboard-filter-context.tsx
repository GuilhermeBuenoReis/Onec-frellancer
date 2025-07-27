'use client';

import { createContext, useContext, useState } from 'react';

interface DashboardFiltersContextType {
  activeTab: 'negotiation' | 'contracts';
  isWalletActive: boolean;
  toggleWallet: () => void;
  setActiveTab: (tab: 'negotiation' | 'contracts') => void;
}

const DashboardFiltersContext = createContext<
  DashboardFiltersContextType | undefined
>(undefined);

export function DashboardFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<'negotiation' | 'contracts'>(
    'contracts'
  );
  const [isWalletActive, setIsWalletActive] = useState(false);

  function toggleWallet() {
    setIsWalletActive(prev => !prev);
  }

  return (
    <DashboardFiltersContext.Provider
      value={{ activeTab, isWalletActive, toggleWallet, setActiveTab }}
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
