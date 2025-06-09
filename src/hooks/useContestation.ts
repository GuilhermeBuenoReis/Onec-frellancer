import { useState, useMemo } from 'react';
import { useContestationApi } from '@/data/contestation/contestationApi';
import { filterByDate } from '@/domain/entities/contestation/use-cases/filter-by-date';
import type { IClientContestation } from '@/domain/entities/contestation/IContestation';

export function useContestation() {
  const { data, isLoading, error } = useContestationApi();
  const first = data[0] ?? null;

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  const clients = first?.clients ?? [];

  const filteredClients = useMemo<IClientContestation[]>(() => {
    return start || end ? filterByDate(clients, start, end) : clients;
  }, [clients, start, end]);

  const chartData = useMemo(
    () =>
      filteredClients.map(c => ({
        month: c.competenceMonth ?? '—',
        returned: c.returned ? Number(c.returned) : 0,
      })),
    [filteredClients]
  );

  return {
    isLoading,
    error,
    credential: first?.credential ?? null,
    clients: filteredClients,
    rawClients: clients,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    chartData,
  };
}
