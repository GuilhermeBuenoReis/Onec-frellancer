import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import type { IClientReceipt } from '@/domain/entities/client-receipt/IClientReceipt';

interface Props {
  items: IClientReceipt[];
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
  onBadgeVariant: (status?: string) => 'default' | 'destructive' | 'outline';
  maxButtons?: number; // default 10
}

export function ClientDetailTable({
  items,
  page,
  totalPages,
  setPage,
  onBadgeVariant,
  maxButtons = 10,
}: Props) {
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }
  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Clientes Detalhado</CardTitle>
        <span className="text-sm">
          Página {page} de {totalPages}
        </span>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>COMP</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>%</TableHead>
                <TableHead>Compensação</TableHead>
                <TableHead>Honorários</TableHead>
                <TableHead>Imposto</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((c, i) => (
                <TableRow
                  key={c.id}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <TableCell>{c.receiptDate}</TableCell>
                  <TableCell>{c.competence}</TableCell>
                  <TableCell>{c.cnpj}</TableCell>
                  <TableCell>{c.clientName}</TableCell>
                  <TableCell>{c.percentage}</TableCell>
                  <TableCell>
                    R$ {c.compensationMonth?.toLocaleString()}
                  </TableCell>
                  <TableCell>R$ {c.honorary?.toLocaleString()}</TableCell>
                  <TableCell>R$ {c.tax?.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={onBadgeVariant(c.status)}>{c.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            >
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  />
                </PaginationItem>
                {start > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(1)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}
                {pageNumbers.map(num => (
                  <PaginationItem key={num}>
                    <PaginationLink
                      isActive={num === page}
                      onClick={() => setPage(num)}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {end < totalPages && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
