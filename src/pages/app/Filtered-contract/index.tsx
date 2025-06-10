import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { useFilteredContracts } from '@/hooks/useFilteredContracts';
import { SearchHeader } from './ui/search-header';
import { ContractsTable } from './ui/contracts-table';

export function FilteredContractsPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { isLoading, query, current, page, totalPages, goBack, setPage } =
    useFilteredContracts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />
        <Helmet>
          <title>Resultados</title>
        </Helmet>
        <SearchHeader query={query} onBack={goBack} />
        <main className="p-4 overflow-y-auto">
          <ContractsTable
            contracts={current}
            query={query}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
}
