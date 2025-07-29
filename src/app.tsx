import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { routeTree } from '@/route-tree-gen';
import { ExportProvider } from './context/export-context';
import { queryClient } from './lib/query-client';

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ExportProvider>
          <RouterProvider router={router} />
        </ExportProvider>
        <Toaster richColors />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
