'use client';

import { createContext, useContext, useState } from 'react';

interface DashboardFiltersContextType {
  isWalletActive: boolean;
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
  const [isWalletActive, setIsWalletActive] = useState(false);

  function toggleWallet() {
    setIsWalletActive(prev => !prev);
  }

  return (
    <DashboardFiltersContext.Provider value={{ isWalletActive, toggleWallet }}>
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
