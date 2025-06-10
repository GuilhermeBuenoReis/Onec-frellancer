import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import type { IContract } from '@/domain/contract/IContract';

export function ContractsTable({
  contracts,
}: {
  contracts: IContract[];
}) {
  const formatDate = (v?: string | null) => {
    if (!v) return '-';
    return v;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map(c => (
            <TableRow key={c.id} className="hover:bg-gray-50">
              <TableCell>{formatDate(c.year)}</TableCell>
              <TableCell>{c.city}</TableCell>
              <TableCell>{c.state}</TableCell>
              <TableCell className="truncate max-w-xs">{c.client}</TableCell>
              <TableCell>{c.cnpj}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    c.status === 'ATIVO'
                      ? 'bg-green-100 text-green-800'
                      : c.status === 'MIGRADO'
                        ? 'bg-yellow-100 text-yellow-800'
                        : c.status === 'AGUARDANDO RECEBER'
                          ? 'bg-orange-100 text-orange-800'
                          : c.status === 'FINALIZADO'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {c.status ?? 'Status não informado'}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.assign(`/contract/${c.id}`)}
                  aria-label="Ver contrato"
                >
                  <Eye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
