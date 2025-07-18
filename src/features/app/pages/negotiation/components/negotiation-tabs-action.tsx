import { useState } from 'react';
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from '../../../../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../components/ui/tabs';
import { SimpleLineChart } from './simple-line-chart';
import { StatusPieChart } from './status-pie-chart';

export function NegotiationTabAction() {
  const [activeTab, setActiveTab] = useState('earnings-total');

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <CardTitle className="text-lg sm:text-xl">
          Total de contratos ganhos!
        </CardTitle>
        <CardAction>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap gap-2 justify-center sm:justify-end">
              <TabsTrigger value="earnings-total">Ganhos</TabsTrigger>
              <TabsTrigger value="control-contract">Controle</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="earnings-total" className="w-full px-4 pb-6">
          <div className="w-full max-w-5xl mx-auto">
            <SimpleLineChart key="earnings" />
          </div>
        </TabsContent>
        <TabsContent value="control-contract" className="w-full px-4 pb-6">
          <div className="w-full max-w-3xl mx-auto">
            <StatusPieChart />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
