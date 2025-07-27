'use client';

import { createContext, useContext, useState } from 'react';

interface NegotiationFilters {
  title: string;
  client: string;
  step: string;
  user: string;
  tags: string;
  status: string[];
  startDate: Date | null;
  endDate: Date | null;
}

interface NegotiationFiltersContextType {
  filters: NegotiationFilters;
  setFilters: (filters: Partial<NegotiationFilters>) => void;
  resetFilters: () => void;
}

const NegotiationFiltersContext =
  createContext<NegotiationFiltersContextType | null>(null);

export function NegotiationFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFiltersState] = useState<NegotiationFilters>({
    title: '',
    client: '',
    step: '',
    user: '',
    tags: '',
    status: [],
    startDate: null,
    endDate: null,
  });

  function setFilters(newFilters: Partial<NegotiationFilters>) {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
    }));
  }

  function resetFilters() {
    setFiltersState({
      title: '',
      client: '',
      step: '',
      user: '',
      tags: '',
      status: [],
      startDate: null,
      endDate: null,
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
