'use client';

import { createContext, useContext, useState } from 'react';

type TabType = 'negotiation' | 'contracts';

interface DashboardTabContextType {
  tab: TabType;
  setTab: (tab: TabType) => void;
}

const DashboardTabContext = createContext<DashboardTabContextType | null>(null);

export function DashboardTabProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState<TabType>('negotiation');

  return (
    <DashboardTabContext.Provider value={{ tab, setTab }}>
      {children}
    </DashboardTabContext.Provider>
  );
}

export function useDashboardTab() {
  const context = useContext(DashboardTabContext);
  if (!context) {
    throw new Error(
      'useDashboardTab precisa estar dentro do DashboardTabProvider'
    );
  }
  return context;
}
