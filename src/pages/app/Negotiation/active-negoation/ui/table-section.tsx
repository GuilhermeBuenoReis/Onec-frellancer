import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import type { INegotiation } from '@/domain/negotiation/INegotiation';

export function TableSection({ items }: { items: INegotiation[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Data</TableHead>
          <TableHead className="text-right">Valor (R$)</TableHead>
          <TableHead className="text-right">Ver detalhes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.client}</TableCell>
            <TableCell className="text-right">{item.status}</TableCell>
            <TableCell className="text-right">
              {item.startsDate
                ? new Date(item.startsDate).toLocaleDateString('pt-BR')
                : '-'}
            </TableCell>
            <TableCell className="text-right">
              {(item.value ?? 0).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </TableCell>
            <TableCell className="text-right">
              <Link to={`/negotiation/${item.id}`}>
                <Eye />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
