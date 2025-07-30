import { createFileRoute } from '@tanstack/react-router';
import { CircleDotDashed } from 'lucide-react';
import z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ContestationFiltersProvider } from './-context/contestation-filters-context';
import { ContestationDataTableProvider } from './-context/data-table-context';
import { ContestationTableFromAPI } from './-table/contestation-table-from-api';

export const Route = createFileRoute('/_app/contestation/')({
  validateSearch: z.object({
    contestationId: z.string().optional(),
  }),
  component: ContestationPage,
});

function ContestationPage() {
  return (
    <ContestationDataTableProvider>
      <ContestationFiltersProvider>
        <main
          className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-24 lg:py-16
       flex flex-col items-center gap-6 lg:gap-10"
        >
          <Card className="min-w-full min-h-full flex gap-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <CircleDotDashed />
                Contestações
              </CardTitle>
              <CardDescription>
                Aqui você pode ver todas as contestações feitas!
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ContestationTableFromAPI />
            </CardContent>
          </Card>
        </main>
      </ContestationFiltersProvider>
    </ContestationDataTableProvider>
  );
}
