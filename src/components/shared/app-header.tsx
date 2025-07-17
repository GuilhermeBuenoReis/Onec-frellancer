import { FileSpreadsheet } from 'lucide-react';
import onec_logo from '../../assets/onec_logo_redonda.svg';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { ActiveNavLink } from './active-nav-link';
import { ModeToggle } from './mode-toggle';

export function AppHeader() {
  return (
    <header className="w-full h-full flex items-center justify-between px-6">
      <div className="h-12 w-1/2 flex items-center gap-4">
        <img
          src={onec_logo}
          alt="Logo da empresa!"
          className="size-12 rounded-full"
        />

        <Separator orientation="vertical" />

        <nav className="w-full flex gap-5">
          <ActiveNavLink to="/app/negotiation">Negociações</ActiveNavLink>

          <ActiveNavLink to="/app/partner">Parceiros</ActiveNavLink>

          <ActiveNavLink to="/app/pending">Pendências</ActiveNavLink>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Button className="cursor-pointer">
          <FileSpreadsheet className="size-4" />
          Explorar dados com IA
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
