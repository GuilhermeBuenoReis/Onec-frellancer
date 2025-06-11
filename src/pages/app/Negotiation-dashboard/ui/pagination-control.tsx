import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';

export function PaginationControl({
  page,
  totalPages,
  pageNumbers,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  pageNumbers: number[];
  onPageChange: (n: number) => void;
}) {
  return (
    <footer className="mt-4 flex justify-center">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      >
        <PaginationContent>
          {pageNumbers.map(n => (
            <PaginationItem key={n}>
              <PaginationLink
                isActive={n === page}
                onClick={() => onPageChange(n)}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > pageNumbers[pageNumbers.length - 1] && (
            <PaginationItem>
              <PaginationEllipsis>...</PaginationEllipsis>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </footer>
  );
}
