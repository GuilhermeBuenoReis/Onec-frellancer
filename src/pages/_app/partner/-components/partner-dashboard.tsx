import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDashboardProvider } from '../-context/dashboard-context';
import { PartnerTableFromAPI } from '../-tables/table-from-api';
import { DashboardChart } from './partner-dashboard-chart';
import { DashboardHeader } from './partner-dashboard-header';
import { DashboardStat } from './partner-dashboard-stats';
import { DashboardTotals } from './partner-dashboard-totals';

export function PartnerDashboard() {
  const { totals } = useDashboardProvider();

  return (
    <Card className="w-full rounded-lg">
      <CardHeader>
        <DashboardHeader />
      </CardHeader>

      <CardContent className="flex flex-col gap-12 mt-4">
        <DashboardStat />
        <DashboardChart />
        {totals && <DashboardTotals />}

        <Separator />
      </CardContent>

      <PartnerTableFromAPI />
    </Card>
  );
}
