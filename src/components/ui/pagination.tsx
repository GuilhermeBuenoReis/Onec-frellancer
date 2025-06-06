import type * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface PaginationProps extends React.ComponentProps<'nav'> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  children?: React.ReactNode;
}

export function Pagination({ className, children, ...props }: PaginationProps) {
  return (
    <nav
      aria-label="pagination"
      className={cn(
        'flex items-center justify-center space-x-2 py-2',
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('inline-flex items-center space-x-1', className)}
      {...props}
    />
  );
}

export function PaginationItem(props: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = { isActive?: boolean } & Omit<
  React.ComponentProps<typeof Button>,
  'children'
> &
  React.ComponentProps<'button'>;

export function PaginationLink({
  isActive,
  className,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      onClick={props.onClick}
      className={cn(
        'px-3 py-1 rounded-md min-w-[2rem] transition-colors',
        isActive ? 'bg-primary text-white' : 'hover:bg-secondary',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export function PaginationPrevious({
  onClick,
  disabled,
}: { onClick?: () => void; disabled?: boolean }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => !disabled && onClick?.()}
      disabled={disabled}
      aria-label="previous page"
      className={cn(
        'p-2 rounded-md',
        disabled && 'opacity-50 pointer-events-none'
      )}
    >
      <ChevronLeft className="w-5 h-5" />
    </Button>
  );
}

export function PaginationNext({
  onClick,
  disabled,
}: { onClick?: () => void; disabled?: boolean }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => !disabled && onClick?.()}
      disabled={disabled}
      aria-label="next page"
      className={cn(
        'p-2 rounded-md',
        disabled && 'opacity-50 pointer-events-none'
      )}
    >
      <ChevronRight className="w-5 h-5" />
    </Button>
  );
}

export function PaginationEllipsis(props: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('px-3 py-1 rounded-md', props.className)}
      {...props}
    >
      <MoreHorizontal className="w-5 h-5" />
    </span>
  );
}
