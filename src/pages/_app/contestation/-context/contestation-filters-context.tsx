'use client';

import { useRouter, useSearch } from '@tanstack/react-router';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { GetContestationById200 } from '@/generated';

interface ContestationFilters {
  client?: string;
  product?: string;
  status?: string;
  competence?: string;
  startDate?: Date;
  endDate?: Date;
}

interface ContestationFiltersContextProps {
  filters: ContestationFilters;
  setFilters: (filters: ContestationFilters) => void;
  resetFilters: () => void;

  contestationId?: string;
  selectedContestationId?: string;
  selectedContestationData?: GetContestationById200;
  setSelectedContestation: (contestation: GetContestationById200) => void;
  clearSelectedContestation: () => void;
}

const ContestationFiltersContext =
  createContext<ContestationFiltersContextProps | null>(null);

export function ContestationFiltersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<ContestationFilters>({});
  const [selectedContestationId, setSelectedContestationId] =
    useState<string>();
  const [selectedContestationData, setSelectedContestationData] =
    useState<GetContestationById200>();

  const search = useSearch({ from: '/_app/contestation/' });
  const router = useRouter();

  useEffect(() => {
    if (
      search.contestationId &&
      search.contestationId !== selectedContestationId
    ) {
      setSelectedContestationId(search.contestationId);
    }
    if (!search.contestationId) {
      clearSelectedContestation();
    }
  }, [search.contestationId]);

  function setContestationId(id?: string) {
    setSelectedContestationId(id);

    router.navigate({
      to: '/contestation',
      search: prev => ({
        ...prev,
        contestationId: id,
      }),
    });
  }

  function setSelectedContestation(contestation: GetContestationById200) {
    setContestationId(contestation.id);
    setSelectedContestationData(contestation);
  }

  function clearSelectedContestation() {
    setContestationId(undefined);
    setSelectedContestationData(undefined);
  }

  function resetFilters() {
    setFilters({});
  }

  return (
    <ContestationFiltersContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        contestationId: search.contestationId,
        selectedContestationId,
        selectedContestationData,
        setSelectedContestation,
        clearSelectedContestation,
      }}
    >
      {children}
    </ContestationFiltersContext.Provider>
  );
}

export function useContestationFiltersContext() {
  const context = useContext(ContestationFiltersContext);
  if (!context) {
    throw new Error(
      'useContestationFiltersContext must be used within ContestationFiltersProvider'
    );
  }
  return context;
}
