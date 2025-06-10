import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { HighlightText } from './highlight-text';
import type { IContract } from '@/domain/contract/IContract';

export function ContractsTable({
  contracts,
  query,
  page,
  totalPages,
  onPageChange,
}: {
  contracts: IContract[];
  query: string;
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (contracts.length === 0) {
    return <p className="text-center py-10">Nenhum resultado encontrado</p>;
  }
  return (
    <>
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
            {contracts.map(c => (
              <TableRow key={c.id} className="hover:bg-gray-100">
                <TableCell>
                  <HighlightText text={c.city ?? ''} query={query} />
                </TableCell>
                <TableCell>
                  <HighlightText text={c.state ?? ''} query={query} />
                </TableCell>
                <TableCell className="truncate max-w-xs">
                  <HighlightText text={c.client ?? ''} query={query} />
                </TableCell>
                <TableCell>
                  <HighlightText text={c.cnpj ?? ''} query={query} />
                </TableCell>
                <TableCell>{c.year}</TableCell>
                <TableCell>
                  <HighlightText
                    text={c.status ?? 'Status não informado'}
                    query={query}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
