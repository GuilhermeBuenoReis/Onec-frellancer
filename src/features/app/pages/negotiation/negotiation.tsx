import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { NegotiationTabAction } from './components/negotiation-tabs-action';
import { SectionCards } from './components/section-cards';
import DemoPage from './components/tables/page';

export function Negotiation() {
  return (
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
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">
              Negociações e Contratos Registrados
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Visualize, filtre e acompanhe em tempo real todos os contratos
              firmados, valores envolvidos, status de negociação e responsáveis
              por cada operação. Ideal para controle e tomada de decisão
              estratégica.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <DemoPage />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
