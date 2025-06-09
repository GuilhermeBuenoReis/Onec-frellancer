import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { useClientReceiptDashboard } from '@/hooks/useClientReceiptDashboard';
import { ClientFilterCard } from './ui/client-filter-card';
import { ClientPieChart } from './ui/client-pie-chart';
import { ClientSummaryTable } from './ui/client-summary-table';
import { ClientDetailTable } from './ui/client-detail-table';

export function ClientReceiptDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
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
    totalPago,
    totalNaoPago,
    detailedItems,
    pageDetailed,
    setPageDetailed,
    totalDetailedPages,
    summaryItems,
    pageSummary,
    setPageSummary,
    totalSummaryPages,
  } = useClientReceiptDashboard();

  const pieData = [
    { name: 'Pago', value: totalPago },
    { name: 'Não Pago', value: totalNaoPago },
  ];
  const colors = ['#34D399', '#F87171'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p>Carregando recebimentos...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />

      <main className="flex-1 p-4 md:p-8 space-y-6">
        <ClientFilterCard
          searchName={searchName}
          onChangeName={setSearchName}
          searchCnpj={searchCnpj}
          onChangeCnpj={setSearchCnpj}
          filterStatus={filterStatus}
          onChangeStatus={setFilterStatus}
          dateFrom={dateFrom}
          onChangeFrom={setDateFrom}
          dateTo={dateTo}
          onChangeTo={setDateTo}
          onSearch={() => setPageDetailed(1)}
          onExport={() => {}}
        />

        <div className="lg:col-span-2">
          <ClientDetailTable
            items={detailedItems}
            page={pageDetailed}
            totalPages={totalDetailedPages}
            setPage={setPageDetailed}
            onBadgeVariant={status =>
              status === 'PAGO'
                ? 'default'
                : status === 'NÃO PAGO'
                  ? 'destructive'
                  : 'outline'
            }
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <ClientPieChart data={pieData} colors={colors} />
          </div>
          <div className="w-full lg:w-1/2">
            <ClientSummaryTable
              items={summaryItems}
              page={pageSummary}
              totalPages={totalSummaryPages}
              setPage={setPageSummary}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
