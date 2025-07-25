import { createFileRoute } from '@tanstack/react-router';
import { DashboardFiltersProvider } from '@/context/dashboard-filter-context';
import { Negotiation } from '../../negotiation/negotiation';

export const Route = createFileRoute('/_app/_business-dashboard/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardFiltersProvider>
      <div>
        <Negotiation />
      </div>
    </DashboardFiltersProvider>
  );
}
