'use client';

import { useNavigate, useSearch } from '@tanstack/react-router';
import { createContext, type ReactNode, useCallback, useContext } from 'react';
import { z } from 'zod';

const filtersSchema = z.object({
  id: z.string().optional(),
  info: z
    .enum(['value', 'honorary', 'tax', 'compensation', 'percentageHonorary'])
    .optional(),
  totals: z.enum(['on', 'off']).optional(),
  month: z.string().optional(),
  contract: z.string().optional(),
  enterprise: z.string().optional(),
  product: z.string().optional(),
  date: z.string().optional(),
});

type Filters = z.infer<typeof filtersSchema>;

interface FiltersContextType extends Filters {
  updateParam: (key: keyof Filters, value?: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  setTotals: (value: 'on' | 'off') => void;
}

const FiltersContext = createContext<FiltersContextType | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate({ from: '/partner' });
  const search = useSearch({ strict: false });
  const params = filtersSchema.parse(search);

  const updateParam = useCallback(
    (key: keyof Filters, value?: string) => {
      const newSearch = { ...params, [key]: value };
      if (!value) delete newSearch[key];
      navigate({ search: newSearch, replace: true });
    },
    [navigate, params]
  );

  const setFilters = useCallback(
    (filters: Partial<Filters>) => {
      const newSearch = { ...params, ...filters };
      Object.keys(filters).forEach(key => {
        if (!filters[key as keyof Filters])
          delete newSearch[key as keyof Filters];
      });
      navigate({ search: newSearch, replace: true });
    },
    [navigate, params]
  );

  return (
    <FiltersContext.Provider
      value={{
        ...params,
        updateParam,
        setFilters,
        setTotals: value => updateParam('totals', value),
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFiltersContext() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error(
      'useFiltersContext precisa estar dentro de FiltersProvider'
    );
  }
  return context;
}
