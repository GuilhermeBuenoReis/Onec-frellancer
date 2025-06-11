import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { INegotiation } from '@/domain/negotiation/INegotiation';
import dayjs from 'dayjs';

export function NegotiationsTable({
  data,
  getStatusClasses,
  navigate,
}: {
  data: INegotiation[];
  page: number;
  totalPages: number;
  pageNumbers: number[];
  onPageChange: (n: number) => void;
  getStatusClasses: (s?: string) => string;
  navigate: (path: string) => void;
}) {
  return (
    <>
      <Table className="min-w-full text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Data Início</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id} className="hover:bg-gray-50">
              <TableCell>
                {n.startsDate ? dayjs(n.startsDate).format('DD/MM/YYYY') : '-'}
              </TableCell>
              <TableCell>{n.client}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(n.status)}`}
                >
                  {n.status || 'Não Informado'}
                </span>
              </TableCell>
              <TableCell>R$ {n.value?.toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/negotiation/${n.id}`)}
                >
                  <Eye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
