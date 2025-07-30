'use client';

import type { ColumnFiltersState } from '@tanstack/react-table';
import { createContext, type ReactNode, useContext, useState } from 'react';

interface ContestationDataTableContextProps {
  filters: ColumnFiltersState;
  setFilters: (filters: ColumnFiltersState) => void;
  exportOpen: boolean;
  setExportOpen: (value: boolean) => void;
}

const ContestationDataTableContext =
  createContext<ContestationDataTableContextProps | null>(null);

export function ContestationDataTableProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <ContestationDataTableContext.Provider
      value={{ filters, setFilters, exportOpen, setExportOpen }}
    >
      {children}
    </ContestationDataTableContext.Provider>
  );
}

export function useContestationDataTableContext() {
  const context = useContext(ContestationDataTableContext);
  if (!context)
    throw new Error(
      'useContestationDataTableContext must be used inside ContestationDataTableProvider'
    );
  return context;
}
