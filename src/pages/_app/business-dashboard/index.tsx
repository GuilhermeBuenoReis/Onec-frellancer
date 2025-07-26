import { createFileRoute } from '@tanstack/react-router';
import { DashboardFiltersProvider } from '@/context/dashboard-filter-context';
import { useGetMe } from '@/generated';
import { BusinessDashboardSkeleton } from './-components/business-dashboard-skeleton';
import { DashboardTabProvider } from './-context/data-tabs-context';
import { BusinessDashboardContent } from './business-dashboard-content';

export const Route = createFileRoute('/_app/business-dashboard/')({
  component: DashboardProvider,
});

function DashboardProvider() {
  const { data, isPending } = useGetMe();

  if (isPending || !data) {
    return <BusinessDashboardSkeleton />;
  }

  return (
    <DashboardFiltersProvider>
      <DashboardTabProvider>
        <BusinessDashboardContent />
      </DashboardTabProvider>
    </DashboardFiltersProvider>
  );
}
