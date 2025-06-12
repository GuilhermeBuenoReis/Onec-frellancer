import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Eye } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import type { IPending } from '@/domain/pending/IPending';

interface PendingTableProps {
  data: IPending[];
}

export function PendingTable({ data }: PendingTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="max-w-xs">Descrição</TableHead>
            <TableHead>Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.client}</TableCell>
              <TableCell>{item.callReason}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.priority}</TableCell>
              <TableCell>
                {dayjs(item.createdAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>{item.responsible}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="max-w-xs truncate">
                {item.description}
              </TableCell>
              <TableCell>
                <Link to={`/pendencias/${item.id}`}>
                  <Eye className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
