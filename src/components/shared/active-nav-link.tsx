import {
  type ActiveLinkOptions,
  Link,
  type LinkProps,
} from '@tanstack/react-router';
import { cn } from '@/lib/utils';

type ActiveNavLinkProps = LinkProps & {
  className?: string;
  asChild?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
};

export function ActiveNavLink({
  to,
  className,
  activeClassName = 'text-foreground font-semibold border-b-2 border-foreground',
  inactiveClassName = 'text-muted-foreground',
  children,
  ...rest
}: ActiveNavLinkProps) {
  return (
    <Link
      to={to}
      {...(rest as ActiveLinkOptions)}
      activeProps={{
        className: cn(activeClassName, className, 'text-md'),
      }}
      inactiveProps={{
        className: cn(inactiveClassName, className, 'text-md'),
      }}
    >
      {children}
    </Link>
  );
}
