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
      <CardHeader className="w-full flex items-center justify-between">
        <CardTitle>Total de contratos ganhos!</CardTitle>
        <CardAction>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex gap-2">
              <TabsTrigger value="earnings-total">Ganhos</TabsTrigger>
              <TabsTrigger value="control-contract">Controle</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent
          value="earnings-total"
          className="w-full h-[320px] px-4 pb-4"
        >
          <SimpleLineChart
            key={activeTab === 'earnings-total' ? 'chart' : 'hide'}
          />
        </TabsContent>
        <TabsContent value="control-contract" className="w-full px-4 pb-4">
          <StatusPieChart />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
