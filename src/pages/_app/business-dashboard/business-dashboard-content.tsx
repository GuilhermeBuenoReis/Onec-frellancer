import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GraphicTableAction } from './-components/graphic-table-action';
import { SectionCards } from './-components/sections-cards';
import { BusinessTabContent } from './-tables/busines-tab-content';
import { BusinessDataTableTabs } from './-tables/business-data-table-tabs';

export function BusinessDashboardContent() {
  return (
    <div className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-24 lg:py-16 flex flex-col items-center gap-6 lg:gap-10">
      <div className="w-full max-w-7xl flex flex-col gap-6">
        <h1 className="text-center text-3xl font-semibold">
          One<span className="text-cyan-600">c</span> - Gestão de clínicas
        </h1>

        <SectionCards />

        <GraphicTableAction />

        <Card className="w-full">
          <CardHeader className="flex flex-col gap-2 sm:gap-4">
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                  Negociações e Contratos Registrados
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Visualize, filtre e acompanhe em tempo real todos os contratos
                  firmados, valores envolvidos, status de negociação e
                  responsáveis por cada operação. Ideal para controle e tomada
                  de decisão estratégica.
                </CardDescription>
              </div>

              <BusinessDataTableTabs />
            </div>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            <BusinessTabContent />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
