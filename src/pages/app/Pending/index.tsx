import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

import { useGetPendings } from '@/http/generated/api';
import { dtoToEntity } from '@/data/pending/pendingService';
import type { IPending } from '@/domain/pending/IPending';

import { PendingForm } from '@/components/pending-form';
import { PendingTable } from './ui/pending-table';
import { PaginationControls } from './ui/pagination-controls';

export function PendingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const { data: raw = [] } = useGetPendings();
  const pendings = useMemo<IPending[]>(
    () => raw.map(r => dtoToEntity(r)),
    [raw]
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(pendings.length / recordsPerPage)),
    [pendings.length]
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * recordsPerPage;
    return pendings.slice(start, start + recordsPerPage);
  }, [pendings, currentPage]);

  const pageNumbers = useMemo(() => {
    const maxButtons = 10;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }
    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet>
        <title>Painel de Pendências</title>
      </Helmet>

      {/* Sidebar desktop */}
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
              toggleSidebar={() => setSidebarOpen(false)}
            />
            <div className="p-2">
              <Button onClick={() => setSidebarOpen(false)}>Fechar</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Painel de Pendências
          </h1>

          {/* ===== Formulário de criação ===== */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Adicionar Nova Pendência
            </h2>
            <PendingForm />
          </div>

          {/* ===== Lista e Paginação ===== */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Lista de Pendências
            </h2>
            <PendingTable data={paginated} />

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              pageNumbers={pageNumbers}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
