'use client';

import { createContext, useContext, useState } from 'react';

interface NegotiationFilters {
  status?: string;
  startDate?: Date;
  endDate?: Date;
}

interface NegotiationFiltersContextType {
  filters: NegotiationFilters;
  setFilters: (filters: NegotiationFilters) => void;
  resetFilters: () => void;
}

const NegotiationFiltersContext = createContext<
  NegotiationFiltersContextType | undefined
>(undefined);

export function NegotiationFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFiltersState] = useState<NegotiationFilters>({});

  function setFilters(newFilters: NegotiationFilters) {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }

  function resetFilters() {
    setFiltersState({});
  }

  return (
    <NegotiationFiltersContext.Provider
      value={{ filters, setFilters, resetFilters }}
    >
      {children}
    </NegotiationFiltersContext.Provider>
  );
}

export function useNegotiationFilters() {
  const context = useContext(NegotiationFiltersContext);
  if (!context) {
    throw new Error(
      'useNegotiationFilters must be used within a NegotiationFiltersProvider'
    );
  }
  return context;
}
