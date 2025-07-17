import { Outlet } from 'react-router';

import { AppSidebar } from '../components/shared/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppHeader } from '../components/shared/app-header';

export function _AppLayout() {
  return (
    <SidebarProvider>
      <div className="block md:hidden">
        <SidebarTrigger />
        <AppSidebar />
      </div>

      <main className="flex flex-col w-full min-h-screen bg-background text-foreground">
        <header className="hidden md:flex w-full px-6 py-4">
          <AppHeader />
        </header>

        <div className="flex-1 px-4 py-2 sm:px-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
