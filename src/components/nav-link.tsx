import { NavLink, type NavLinkProps, useLocation } from 'react-router-dom';

export function NavLinkPathName(props: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        `flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground ${
          isActive || pathname === props.to ? 'text-foreground' : ''
        } ${props.className || ''}`
      }
    />
  );
}
