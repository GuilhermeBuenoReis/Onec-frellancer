import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDashboardTab } from '../-context/data-tabs-context';

export function BusinessDataTableTabs() {
  const { setTab } = useDashboardTab();

  return (
    <Tabs
      defaultValue="negotiation"
      onValueChange={value => setTab(value as 'negotiation' | 'contracts')}
    >
      <TabsList className="bg-muted rounded-lg p-1">
        <TabsTrigger
          value="negotiation"
          className="data-[state=active]:bg-background data-[state=active]:shadow px-4 py-2 rounded-md cursor-pointer"
        >
          Negociações
        </TabsTrigger>
        <TabsTrigger
          value="contracts"
          className="data-[state=active]:bg-background data-[state=active]:shadow px-4 py-2 rounded-md cursor-pointer"
        >
          Contratos
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
