import { Outlet } from 'react-router';
import onecLogo from '../assets/onec_logo_redonda.svg';
import { Separator } from '../components/ui/separator';

export function AuthLayout() {
  const year = new Date().getFullYear();

  return (
    <div className="min-w-screen min-h-screen grid grid-cols-1 md:grid-cols-2">
      <aside className="w-full p-6 md:p-8 bg-primary-foreground flex flex-col justify-between">
        <header className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0 h-20">
          <img
            src={onecLogo}
            alt="Logo da ONEC"
            className="rounded-full size-14"
          />

          <Separator
            orientation="vertical"
            className="hidden md:block h-12 w-px bg-gray-900 mx-4"
          />

          <span className="text-2xl md:text-4xl text-center font-bold text-foreground">
            ONE<span className="text-cyan-500">C</span> - Gestão de clínicas
          </span>
        </header>

        <footer className="text-center text-xs md:text-sm text-muted-foreground py-6">
          © {year} ONEC - Todos os direitos reservados.
        </footer>
      </aside>

      <main className="w-full flex flex-col items-center justify-center px-6 py-12 sm:px-8 bg-muted">
        <Outlet />
      </main>
    </div>
  );
}
