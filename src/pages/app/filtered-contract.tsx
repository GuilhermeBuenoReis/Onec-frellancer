import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { useGetContract } from '@/http/generated/api';

function highlightText(text: string, query: string) {
  if (!query) return text;
  const parts = text.split(
    new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi')
  );
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function FilteredContracts() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim().toLowerCase() || '';

  const { data, isLoading } = useGetContract();
  const contracts = data ?? [];

  const activeContracts = useMemo(
    () => contracts.filter(c => (c.status ?? '').toLowerCase() === 'ativo'),
    [contracts]
  );

  const filtered = useMemo(
    () =>
      activeContracts.filter(c => {
        const client = c.client ?? '';
        const status = c.status ?? '';
        return (
          client.toLowerCase().includes(query) ||
          status.toLowerCase().includes(query)
        );
      }),
    [activeContracts, query]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const currentContracts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={true} toggleSidebar={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">Resultados: “{query}”</h1>
        </header>
        <main className="p-4 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center py-10">Nenhum resultado encontrado</p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Ano</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentContracts.map(c => (
                    <TableRow key={c.id} className="hover:bg-gray-100">
                      <TableCell>
                        {highlightText(c.city ?? '', query)}
                      </TableCell>
                      <TableCell>
                        {highlightText(c.state ?? '', query)}
                      </TableCell>
                      <TableCell className="truncate max-w-xs">
                        {highlightText(c.client ?? '', query)}
                      </TableCell>
                      <TableCell>
                        {highlightText(c.cnpj ?? '', query)}
                      </TableCell>
                      <TableCell>{c.year}</TableCell>
                      <TableCell>
                        {highlightText(
                          c.status ?? 'Status não informado',
                          query
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export { FilteredContracts };
