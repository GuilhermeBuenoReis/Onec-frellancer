import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useGetMe } from '@/generated';
import { BusinessDashboardSkeleton } from './-components/business-dashboard-skeleton';

export const Route = createFileRoute('/_app/_business-dashboard/')({
  component: UserNotAthenticate,
});

function UserNotAthenticate() {
  const { data, isPending } = useGetMe();

  if (isPending || !data) {
    return <BusinessDashboardSkeleton />;
  }

  return <Navigate to="/dashboard" />;
}
