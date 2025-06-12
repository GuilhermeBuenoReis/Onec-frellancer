import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { PendingForm } from '@/components/pending-form';
import { usePendingDashboard } from '@/hooks/usePendingDashboard';
import { PendingTable } from './ui/pending-table';

export function PendingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { current, page, setPage, totalPages, pageNumbers } =
    usePendingDashboard(10);

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Painel de Pendências" />
      <div className="hidden md:flex">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(o => !o)}
        />
        <div className="w-2 cursor-col-resize bg-gray-300" />
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative bg-white w-64 h-full shadow-lg">
            <Sidebar
              isOpen={sidebarOpen}
              toggleSidebar={() => setSidebarOpen(o => !o)}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />
        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Painel de Pendências</h1>

          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Adicionar Nova Pendência
            </h2>
            <PendingForm />
          </section>

          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Lista de Pendências</h2>
            <PendingTable
              data={current}
              page={page}
              totalPages={totalPages}
              pageNumbers={pageNumbers}
              onPageChange={setPage}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
