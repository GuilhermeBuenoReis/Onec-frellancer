import { NavLink, type NavLinkProps } from 'react-router';
import { cn } from '../../lib/utils';

type ActiveNavLinkProps = NavLinkProps & {
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  asChild?: boolean;
};

export function ActiveNavLink({
  to,
  className,
  activeClassName = 'text-foreground font-semibold',
  inactiveClassName = 'text-muted-foreground',
  children,
  asChild,
  ...rest
}: ActiveNavLinkProps) {
  return (
    <NavLink
      to={to}
      {...rest}
      className={({ isActive }) =>
        cn(
          'transition-colors hover:text-foreground',
          isActive ? activeClassName : inactiveClassName,
          className,
          `text-lg`
        )
      }
    >
      {children}
    </NavLink>
  );
}
