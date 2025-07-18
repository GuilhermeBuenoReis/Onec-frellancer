import { useNavigate, useSearchParams } from 'react-router';
import {
  Card,
  CardContent,
  CardHeader,
} from '../../../../../../components/ui/card';
import { Separator } from '../../../../../../components/ui/separator';
import { useDashboardData } from '../../hooks/useDashboardData';
import { dashboardParamsSchema } from '../../schemas/deashboard-params-schema';
import { DashboardChart } from './partner-dashboard-chart';
import { DashboardHeader } from './partner-dashboard-header';
import { DashboardStat } from './partner-dashboard-stats';
import { DashboardTotals } from './partner-dashboard-totals';
import { PartnerTablePage } from './table/page';

interface PartnerDashboardProps {
  name: string;
}

export function PartnerDashboard({ name }: PartnerDashboardProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const validated = dashboardParamsSchema.safeParse({
    info: searchParams.get('info'),
    totals: searchParams.get('totals'),
  });

  const infoType = validated.success ? validated.data.info : 'valor';
  const showTotals = validated.success && validated.data.totals === 'on';

  const { selectedData, current, previous } = useDashboardData(infoType);

  function updateParam(key: string, value?: string) {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    navigate({ search: `?${newParams.toString()}` }, { replace: true });
  }

  return (
    <Card className="w-full rounded-lg flex-1">
      <CardHeader>
        <DashboardHeader
          name={name}
          infoType={infoType}
          onChange={val => updateParam('info', val)}
          showTotals={showTotals}
          onToggleTotals={() => {
            updateParam('totals', showTotals ? undefined : 'on');
          }}
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-12 mt-4">
        <DashboardStat
          current={current.value}
          previous={previous.value}
          infoType={infoType}
        />
        <DashboardChart data={selectedData} />
        {showTotals && (
          <DashboardTotals data={selectedData} infoType={infoType} />
        )}

        <Separator />
      </CardContent>
      <PartnerTablePage />
    </Card>
  );
}
