import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { useActiveNegotiations } from '@/hooks/useActiveNegotiations';
import { FilterCard } from './ui/filter-card';
import { ChartsSection } from './ui/charts-section';
import { TableSection } from './ui/table-section';
import { PaginationControl } from './ui/pagination-control';
import * as XLSX from 'xlsx';

export function ActiveNegotiationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
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
  } = useActiveNegotiations();

  function exportToExcel() {
    const exportData = currentItems.map(n => ({
      ID: n.id,
      Cliente: n.client,
      Status: n.status,
      'Data Início': n.startsDate
        ? new Date(n.startsDate).toLocaleDateString('pt-BR')
        : '',
      Valor: n.value ?? 0,
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Negociações');
    XLSX.writeFile(wb, 'negociacoes.xlsx');
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Contratos Ativos & Ganhos</h1>
        </header>

        {isLoading ? (
          <p>Carregando negociações...</p>
        ) : (
          <>
            <FilterCard
              filterClient={filterClient}
              onChangeClient={setFilterClient}
              filterDate={filterDate}
              onChangeDate={setFilterDate}
              onExport={exportToExcel}
            />

            <ChartsSection data={chartData} />

            <TableSection items={currentItems} />

            <footer className="mt-4 flex justify-center">
              <PaginationControl
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
