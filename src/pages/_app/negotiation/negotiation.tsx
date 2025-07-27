'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardFiltersProvider } from '@/pages/_app/business-dashboard/-context/dashboard-filter-context';
import { NegotiationTabAction } from './components/negotiation-tabs-action';
import { NegotiationTabsContent } from './components/negotiation-tabs-content';
import { SectionCards } from './components/section-cards';

export function Negotiation() {
  const [activeTab, setActiveTab] = useState<'negotiation' | 'contracts'>(
    'negotiation'
  );

  return (
    <DashboardFiltersProvider>
      <div
        className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-24 lg:py-16
     flex flex-col items-center gap-6 lg:gap-10"
      >
        <div className="w-full max-w-7xl flex flex-col gap-6">
          <h1 className="text-center text-3xl font-semibold">
            One<span className="text-cyan-600">c</span> - Gestão de clínicas
          </h1>

          <SectionCards />

          <NegotiationTabAction />

          <Card className="w-full">
            <CardHeader className="flex flex-col gap-2 sm:gap-4">
              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                    Negociações e Contratos Registrados
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Visualize, filtre e acompanhe em tempo real todos os
                    contratos firmados, valores envolvidos, status de negociação
                    e responsáveis por cada operação. Ideal para controle e
                    tomada de decisão estratégica.
                  </CardDescription>
                </div>

                <Tabs
                  defaultValue="negotiation"
                  onValueChange={value =>
                    setActiveTab(value as 'negotiation' | 'contracts')
                  }
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
              </div>
            </CardHeader>

            <CardContent className="overflow-x-auto">
              <NegotiationTabsContent
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardFiltersProvider>
  );
}
