import type * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Button, buttonVariants } from '@/components/ui/button';

export interface PaginationProps extends React.ComponentProps<'nav'> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: React.ReactNode;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  children,
  ...props
}: PaginationProps) {
  return (
    <nav
      // biome-ignore lint/a11y/noRedundantRoles: <explanation>
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
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
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

export function PaginationItem(props: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = { isActive?: boolean } & Pick<
  React.ComponentProps<typeof Button>,
  'size'
> &
  React.ComponentProps<'a'>;

export function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({ variant: isActive ? 'outline' : 'ghost', size }),
        className
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({
  onClick,
  disabled,
}: { onClick?: () => void; disabled?: boolean }) {
  return (
    <a
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="button"
      // biome-ignore lint/a11y/useValidAnchor: <explanation>
      onClick={() => !disabled && onClick?.()}
      aria-label="previous"
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'default' }),
        disabled && 'opacity-50 pointer-events-none'
      )}
    >
      <ChevronLeft className="w-5 h-5" />
    </a>
  );
}

export function PaginationNext({
  onClick,
  disabled,
}: { onClick?: () => void; disabled?: boolean }) {
  return (
    <a
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="button"
      // biome-ignore lint/a11y/useValidAnchor: <explanation>
      onClick={() => !disabled && onClick?.()}
      aria-label="next"
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'default' }),
        disabled && 'opacity-50 pointer-events-none'
      )}
    >
      <ChevronRight className="w-5 h-5" />
    </a>
  );
}

export function PaginationEllipsis(props: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex items-center justify-center', props.className)}
      {...props}
    >
      <MoreHorizontal className="w-4 h-4" />
    </span>
  );
}
