import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useContractsDashboard } from '@/hooks/useContractsDashboard';
import { SearchHeader } from './ui/search-header';
import { StatusChart } from './ui/status-chart';
import { ContractsTable } from './ui/contracts-table';
import { PaginationControl } from './ui/pagination-control';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    isLoading,
    search,
    setSearch,
    handleSearch,
    statusCounts,
    contracts,
    page,
    setPage,
    totalPages,
    pageNumbers,
    remainingPages,
  } = useContractsDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">Loading…</div>
    );
  }

  const exportToExcel = () => {
    const exportData = contracts.map(c => ({
      Data: c.year ?? '',
      Cidade: c.city ?? '',
      Estado: c.state ?? '',
      Cliente: c.client ?? '',
      CNPJ: c.cnpj ?? '',
      Status: c.status ?? '',
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contratos');
    XLSX.writeFile(wb, 'contratos_filtrados.xlsx');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(v => !v)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(v => !v)} />
        <main className="p-6 overflow-y-auto">
          <Helmet>
            <title>Dashboard</title>
          </Helmet>

          <SearchHeader
            search={search}
            onSearchChange={setSearch}
            onSearchSubmit={handleSearch}
            onOpenCreate={() => navigate('/create-contract')}
            onExport={exportToExcel}
          />

          <StatusChart data={statusCounts} />

          <ContractsTable contracts={contracts} />

          <PaginationControl
            page={page}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            remainingPages={remainingPages}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
}
