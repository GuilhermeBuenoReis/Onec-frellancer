import { useState, useMemo } from 'react';
import { useNegotiations } from '@/data/negotiation/negotiationApi';
import { listActiveOrWon } from '@/domain/entities/negotiation/use-cases/listActive';
import type { INegotiation } from '@/domain/entities/negotiation/INegotiation';

export function useActiveNegotiations() {
  const { negotiations, isLoading } = useNegotiations();
  const [filterClient, setFilterClient] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const active = useMemo<INegotiation[]>(
    () => listActiveOrWon(negotiations),
    [negotiations]
  );

  const filtered = useMemo<INegotiation[]>(() => {
    return active.filter(n => {
      const matchesClient = filterClient
        ? n.client.toLowerCase().includes(filterClient.toLowerCase())
        : true;
      const matchesDate = filterDate
        ? n.startsDate?.slice(0, 10) === filterDate
        : true;
      return matchesClient && matchesDate;
    });
  }, [active, filterClient, filterDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const currentItems = useMemo<INegotiation[]>(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  const chartData = useMemo(() => {
    type CD = { month: string; amount: number };
    const grouped: CD[] = [];
    filtered.forEach(n => {
      if (!n.startsDate) return;
      const date = new Date(n.startsDate);
      const month = date.toLocaleString('pt-BR', {
        month: 'short',
        year: 'numeric',
      });
      const found = grouped.find(g => g.month === month);
      if (found) found.amount += n.value ?? 0;
      else grouped.push({ month, amount: n.value ?? 0 });
    });
    return grouped;
  }, [filtered]);

  return {
    isLoading,
    filterClient,
    setFilterClient,
    filterDate,
    setFilterDate,
    page,
    setPage,
    totalPages,
    currentItems,
    chartData,
    totalCount: filtered.length,
  };
}
