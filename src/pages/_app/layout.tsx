import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppHeader } from '@/components/shared/app-header';
import { AppSidebar } from '@/components/shared/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <div className="block md:hidden">
        <SidebarTrigger />
        <AppSidebar />
      </div>

      <main className="flex flex-col w-full min-h-screen bg-background text-foreground px-6 py-4 gap-12">
        <div className="hidden md:flex w-full">
          <AppHeader />
        </div>

        <div className="flex-1 sm:px-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
