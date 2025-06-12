import { useState, useMemo } from 'react';
import { useGetPendings } from '@/http/generated/api';
import type { IPending } from '@/domain/pending/IPending';

export function usePendingDashboard(itemsPerPage = 10, maxPageButtons = 10) {
  const { data = [] } = useGetPendings();
  const pendings: IPending[] = data as IPending[];

  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(pendings.length / itemsPerPage));

  const current = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return pendings.slice(start, start + itemsPerPage);
  }, [pendings, page, itemsPerPage]);

  const pageNumbers = useMemo(() => {
    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, page - half);
    const end = Math.min(totalPages, start + maxPageButtons - 1);
    if (end - start + 1 < maxPageButtons) {
      start = Math.max(1, end - maxPageButtons + 1);
    }
    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [page, totalPages, maxPageButtons]);

  if (page > totalPages) {
    setPage(1);
  }

  return {
    current,
    page,
    setPage,
    totalPages,
    pageNumbers,
  };
}
