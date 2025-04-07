import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import dayjs from 'dayjs';

interface FinancialDetailsProps {
  paginatedData: any[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function FinancialDetails({
  paginatedData,
  currentPage,
  totalPages,
  onPageChange,
}: FinancialDetailsProps) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data Início</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.title || 'Título não definido'}</TableCell>
                <TableCell>
                  <span className="badge badge-outline">
                    {item.status || 'Desconhecido'}
                  </span>
                </TableCell>
                <TableCell>R$ {item.value?.toLocaleString() || '0'}</TableCell>
                <TableCell>
                  {dayjs(item.startsDate).format('DD/MM/YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="justify-center"
        />
      </div>
    </Card>
  );
}
