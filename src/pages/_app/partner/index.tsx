import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { ListPartnerAside } from './-components/list-aside-partner';
import { PartnerDashboard } from './-components/partner-dashboard';
import { PartnerDashboardProvider } from './-context/partner-dashboard-context';

export const Route = createFileRoute('/_app/partner/')({
  validateSearch: z.object({
    id: z.string().optional(),
  }),
  component: PartnerDashboardContent,
});

function PartnerDashboardContent() {
  return (
    <PartnerDashboardProvider>
      <main className="w-full max-w-7xl mx-auto min-h-screen px-4 py-8 sm:px-6 lg:px-24 lg:py-16 flex justify-center gap-6 lg:gap-10">
        <ListPartnerAside />
        <PartnerDashboard />
      </main>
    </PartnerDashboardProvider>
  );
}
