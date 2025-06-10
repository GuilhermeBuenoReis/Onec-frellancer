import { useState, useMemo, useEffect } from 'react';
import { useGetContractApi } from '@/data/contract/contractApi';
import { filterContracts } from '@/domain/contract/use-case/filter-contracts';
import { countByStatus } from '@/domain/contract/use-case/count-by-status';
import type { IContract } from '@/domain/contract/IContract';

export function useContractsDashboard() {
  const { contracts, isLoading } = useGetContractApi();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = useMemo<IContract[]>(
    () => filterContracts(contracts, search),
    [contracts, search]
  );

  const statusCounts = useMemo(() => countByStatus(filtered), [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const current = useMemo(
    () => filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filtered, page]
  );

  const handleSearch = () => setPage(1);

  const maxButtons = 10;
  const half = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, page - half);
  let endPage = startPage + maxButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  const remainingPages = totalPages - endPage;

  return {
    isLoading,
    search,
    setSearch,
    handleSearch,
    statusCounts,
    contracts: current,
    page,
    setPage,
    totalPages,
    pageNumbers,
    remainingPages,
  };
}
