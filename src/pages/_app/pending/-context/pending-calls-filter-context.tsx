'use client';

import { useRouter, useSearch } from '@tanstack/react-router';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { GetOnePending200 } from '@/generated';

interface PendingCallsFilters {
  client?: string;
  responsible?: string;
  status?: string;
  category?: string;
  startDate?: Date;
  endDate?: Date;
}

interface PendingCallsFiltersContextProps {
  filters: PendingCallsFilters;
  setFilters: (filters: PendingCallsFilters) => void;
  resetFilters: () => void;

  pendingId?: string;
  selectedPendingId?: string;
  selectedPendingData?: GetOnePending200;
  setSelectedPending: (pending: GetOnePending200) => void;
  clearSelectedPending: () => void;
}

const PendingCallsFiltersContext =
  createContext<PendingCallsFiltersContextProps | null>(null);

export function PendingCallsFiltersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<PendingCallsFilters>({});
  const [selectedPendingId, setSelectedPendingId] = useState<string>();
  const [selectedPendingData, setSelectedPendingData] =
    useState<GetOnePending200>();
  const search = useSearch({ from: '/_app/pending/' });
  const router = useRouter();

  useEffect(() => {
    if (search.pendingId && search.pendingId !== selectedPendingId) {
      setSelectedPendingId(search.pendingId);
    }
    if (!search.pendingId) {
      clearSelectedPending();
    }
  }, [search.pendingId]);

  function setPendingId(id?: string) {
    setSelectedPendingId(id);

    router.navigate({
      to: '/pending',
      search: prev => ({
        ...prev,
        pendingId: id,
      }),
    });
  }

  function setSelectedPending(pending: GetOnePending200) {
    setPendingId(pending.id); // atualiza a URL
    setSelectedPendingData(pending); // salva os dados
  }

  function clearSelectedPending() {
    setPendingId(undefined);
    setSelectedPendingData(undefined);
  }

  function resetFilters() {
    setFilters({});
  }

  return (
    <PendingCallsFiltersContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        pendingId: search.pendingId,
        selectedPendingId,
        selectedPendingData,
        setSelectedPending,
        clearSelectedPending,
      }}
    >
      {children}
    </PendingCallsFiltersContext.Provider>
  );
}

export function usePendingCallsFiltersContext() {
  const context = useContext(PendingCallsFiltersContext);
  if (!context) {
    throw new Error(
      'usePendingCallsFiltersContext must be used within PendingCallsFiltersProvider'
    );
  }
  return context;
}
