import { useState, useMemo } from 'react';
import type { IPending } from '@/domain/pending/IPending';
import { useGetPendings } from '@/http/generated/api';

export function usePendingDashboard(recordsPerPage = 10) {
  const { data = [] } = useGetPendings();
  const [page, setPage] = useState(1);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(data.length / recordsPerPage)),
    [data.length, recordsPerPage]
  );

  const current = useMemo<IPending[]>(() => {
    const start = (page - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  }, [data, page, recordsPerPage]);

  const pageNumbers = useMemo<number[]>(() => {
    const maxButtons = 10;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, page - half);
    const end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  return {
    pending: data as IPending[],
    current,
    page,
    setPage,
    totalPages,
    pageNumbers,
  };
}
