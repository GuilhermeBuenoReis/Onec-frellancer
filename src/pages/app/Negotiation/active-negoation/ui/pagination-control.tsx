import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface Props {
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
}

export function PaginationControl({ page, setPage, totalPages }: Props) {
  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    >
      <PaginationContent>
        <PaginationItem>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <ArrowLeft />
          </Button>
        </PaginationItem>

        {pages.map(p => (
          <PaginationItem key={p}>
            <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > end && (
          <PaginationItem>
            <PaginationEllipsis>...</PaginationEllipsis>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <ArrowRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
