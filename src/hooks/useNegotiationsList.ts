import { useState, useMemo } from 'react';
import { useNegotiationsApi } from '@/data/negotiation/negotiationApi';
import { filterActive } from '@/domain/negotiation/use-cases/filter-active';
import { filterByQuery } from '@/domain/negotiation/use-cases/filter-by-query';
import type { INegotiation } from '@/domain/negotiation/INegotiation';

export function useNegotiationsList() {
  const { list, isLoading } = useNegotiationsApi();
  const [query, setQuery] = useState('');

  const active = useMemo<INegotiation[]>(() => filterActive(list), [list]);
  const filtered = useMemo<INegotiation[]>(
    () => filterByQuery(active, query),
    [active, query]
  );

  return { isLoading, query, setQuery, negotiations: filtered };
}
