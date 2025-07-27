'use client';

import { createContext, useContext, useState } from 'react';

interface ContractFiltersContextType {
  filters: {
    client: string;
    city: string;
    state: string;
    cnpj: string;
    sindic: string;
    year: string;
    matter: string;
    forecast: string;
    status: string[];
    partner: string;
    email: string;
  };
  setFilters: (filters: Partial<ContractFiltersContextType['filters']>) => void;
  resetFilters: () => void;
}

const ContractFiltersContext = createContext<ContractFiltersContextType | null>(
  null
);

export function ContractFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFiltersState] = useState<
    ContractFiltersContextType['filters']
  >({
    client: '',
    city: '',
    state: '',
    cnpj: '',
    sindic: '',
    year: '',
    matter: '',
    forecast: '',
    status: [''],
    partner: '',
    email: '',
  });

  function setFilters(
    newFilters: Partial<ContractFiltersContextType['filters']>
  ) {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
    }));
  }

  function resetFilters() {
    setFiltersState({
      client: '',
      city: '',
      state: '',
      cnpj: '',
      sindic: '',
      year: '',
      matter: '',
      forecast: '',
      status: [''],
      partner: '',
      email: '',
    });
  }

  return (
    <ContractFiltersContext.Provider
      value={{ filters, setFilters, resetFilters }}
    >
      {children}
    </ContractFiltersContext.Provider>
  );
}

export function useContractFilters() {
  const context = useContext(ContractFiltersContext);
  if (!context) {
    throw new Error(
      'useContractFilters must be used within a ContractFiltersProvider'
    );
  }
  return context;
}
