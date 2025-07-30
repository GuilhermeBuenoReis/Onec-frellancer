'use client';

import type { ColumnFiltersState } from '@tanstack/react-table';
import { createContext, type ReactNode, useContext, useState } from 'react';

interface DataTableContextProps {
  filters: ColumnFiltersState;
  setFilters: (filters: ColumnFiltersState) => void;
  exportOpen: boolean;
  setExportOpen: (value: boolean) => void;
}

const DataTableContext = createContext<DataTableContextProps | null>(null);

export function DataTableProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <DataTableContext.Provider
      value={{ filters, setFilters, exportOpen, setExportOpen }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export function useDataTableContext() {
  const context = useContext(DataTableContext);
  if (!context)
    throw new Error(
      'useDataTableContext must be used inside DataTableProvider'
    );
  return context;
}
