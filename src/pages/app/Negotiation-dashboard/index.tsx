import { Helmet } from 'react-helmet';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useNegotiationsDashboard } from '@/hooks/useNegotiationsDashboard';
import { SearchHeader } from './ui/search-header';
import { CreateNegotiationSheet } from './ui/create-negotiation-sheet';
import { SummaryCards } from './ui/summary-cards';
import { NegotiationsTable } from './ui/negotiations-table';
import { PaginationControl } from './ui/pagination-control';

export function NegotiationDashboardPage() {
  const {
    isLoading,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    pageNumbers,
    current,
    totalProjects,
    totalValue,
    averageValue,
    sheetOpen,
    setSheetOpen,
    register,
    errors,
    onCreate,
    isSubmitting,
    handleSearch,
    getStatusClasses,
    navigate,
  } = useNegotiationsDashboard();

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Helmet>
        <title>Dashboard Financeiro</title>
      </Helmet>
      <Sidebar isOpen toggleSidebar={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => {}} />
        <main className="p-6 overflow-y-auto">
          <div className="flex justify-between mb-6">
            <SearchHeader
              search={search}
              setSearch={setSearch}
              onSearch={handleSearch}
            />
            <CreateNegotiationSheet
              open={sheetOpen}
              setOpen={setSheetOpen}
              register={register}
              errors={errors}
              onSubmit={onCreate}
              isSubmitting={isSubmitting}
            />
          </div>

          <SummaryCards
            totalProjects={totalProjects}
            totalValue={totalValue}
            averageValue={averageValue}
          />

          <NegotiationsTable
            data={current}
            page={page}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onPageChange={setPage}
            getStatusClasses={getStatusClasses}
            navigate={navigate}
          />

          <PaginationControl
            page={page}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
}
