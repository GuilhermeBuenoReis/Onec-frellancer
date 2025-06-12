import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import type { IPending } from '@/domain/pending/IPending';

interface PendingTableProps {
  data: IPending[];
  page: number;
  totalPages: number;
  pageNumbers: number[];
  onPageChange: (p: number) => void;
}

export function PendingTable({
  data,
  page,
  totalPages,
  pageNumbers,
  onPageChange,
}: PendingTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
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

      <footer className="mt-4 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        >
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
              >
                <ArrowLeft />
              </Button>
            </PaginationItem>

            {pageNumbers.map(num => (
              <PaginationItem key={num}>
                <PaginationLink
                  isActive={num === page}
                  onClick={() => onPageChange(num)}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > pageNumbers[pageNumbers.length - 1] && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
              >
                <ArrowRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </footer>
    </>
  );
}
