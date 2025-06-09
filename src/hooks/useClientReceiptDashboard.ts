import { useState, useMemo } from 'react';
import { useClientReceipts } from '@/data/client-receipt/clientReceiptApi';
import { filterReceipts } from '@/domain/entities/client-receipt/use-case/filter-receipts';

export function useClientReceiptDashboard() {
  const { receipts, isLoading } = useClientReceipts();
  const [searchName, setSearchName] = useState('');
  const [searchCnpj, setSearchCnpj] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'Todos' | 'PAGO' | 'NÃO PAGO'
  >('Todos');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [pageDetailed, setPageDetailed] = useState(1);
  const [pageSummary, setPageSummary] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(
    () =>
      filterReceipts(receipts, {
        name: searchName,
        cnpj: searchCnpj,
        status: filterStatus,
        dateFrom,
        dateTo,
      }),
    [receipts, searchName, searchCnpj, filterStatus, dateFrom, dateTo]
  );

  const totalDetailedPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const detailedItems = useMemo(
    () =>
      filtered.slice((pageDetailed - 1) * pageSize, pageDetailed * pageSize),
    [filtered, pageDetailed]
  );

  const totalSummaryPages = Math.max(1, Math.ceil(receipts.length / pageSize));
  const summaryItems = useMemo(
    () => receipts.slice((pageSummary - 1) * pageSize, pageSummary * pageSize),
    [receipts, pageSummary]
  );

  const { totalPago, totalNaoPago } = useMemo(() => {
    let pago = 0;
    let naoPago = 0;
    (filtered.length ? filtered : receipts).forEach(r => {
      if (r.status === 'PAGO') pago += r.compensationMonth ?? 0;
      else if (r.status === 'NÃO PAGO') naoPago += r.compensationMonth ?? 0;
    });
    return { totalPago: pago, totalNaoPago: naoPago };
  }, [filtered, receipts]);

  return {
    isLoading,
    searchName,
    setSearchName,
    searchCnpj,
    setSearchCnpj,
    filterStatus,
    setFilterStatus,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    pageDetailed,
    setPageDetailed,
    pageSummary,
    setPageSummary,
    totalDetailedPages,
    detailedItems,
    totalSummaryPages,
    summaryItems,
    totalPago,
    totalNaoPago,
  };
}
