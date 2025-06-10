import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetContractApi } from '@/data/contract/contractApi';
import { filterActiveContracts } from '@/domain/contract/use-case/filter-active-contracts';
import { filterByQuery } from '@/domain/contract/use-case/filter-by-query';
import type { IContract } from '@/domain/contract/IContract';

export function useFilteredContracts() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query')?.trim().toLowerCase() || '';

  const { contracts, isLoading } = useGetContractApi();

  // 1) apenas ativos
  const active = useMemo<IContract[]>(
    () => filterActiveContracts(contracts),
    [contracts]
  );

  // 2) filtro por query
  const filtered = useMemo<IContract[]>(
    () => filterByQuery(active, queryParam),
    [active, queryParam]
  );

  // 3) paginação
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const current = useMemo<IContract[]>(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  // voltar
  const goBack = () => navigate(-1);

  return {
    isLoading,
    query: queryParam,
    filtered,
    current,
    page,
    setPage,
    totalPages,
    goBack,
  };
}
