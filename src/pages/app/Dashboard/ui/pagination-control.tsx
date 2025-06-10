import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';

export function PaginationControl({
  page,
  totalPages,
  pageNumbers,
  remainingPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  pageNumbers: number[];
  remainingPages: number;
  onPageChange: (p: number) => void;
}) {
  return (
    <footer className="mt-4 flex justify-center">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            />
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
          {remainingPages > 0 && (
            <PaginationItem>
              <PaginationEllipsis>+{remainingPages}</PaginationEllipsis>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </footer>
  );
}
