'use client';

import { createContext, useContext, useState } from 'react';

/*
  title: z.string(),
  client: z.string(),
  step: z.string(),
  user: z.string(),
  tags: z.string(),
  status: z.string(),
*/

interface NegotiationFilters {
  title?: string;
  client?: string;
  step?: string;
  user?: string;
  tags?: string;
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
    setFiltersState({
      title: '',
      client: '',
      step: '',
      user: '',
      tags: '',
      status: '',
      startDate: undefined,
      endDate: undefined,
    });
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
