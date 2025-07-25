import { createFileRoute, Outlet } from '@tanstack/react-router';
import { DashboardSection } from './-negotiation/negotiation-section';

export const Route = createFileRoute('/_app/_business-dashboard/dashboard')({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-24 lg:py-16 flex flex-col items-center gap-6 lg:gap-10">
      <h1 className="text-center text-3xl font-semibold">
        One<span className="text-cyan-600">c</span> - Gestão de clínicas
      </h1>

      <DashboardSection />

      <Outlet />
    </div>
  );
}
