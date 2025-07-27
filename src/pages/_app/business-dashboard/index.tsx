import { createFileRoute } from '@tanstack/react-router';
import { useGetMe } from '@/generated';
import { BusinessDashboardSkeleton } from './-components/business-dashboard-skeleton';
import { AppProviders } from './-providers/app-provider';
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
    <AppProviders>
      <BusinessDashboardContent />
    </AppProviders>
  );
}
