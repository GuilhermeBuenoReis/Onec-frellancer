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
import { DataTableProvider } from './-context/data-table-context';
import { PendingCallsFiltersProvider } from './-context/pending-calls-filter-context';
import { PendingCallsTableFromAPI } from './-table/pending-calls-table-page';

export const Route = createFileRoute('/_app/pending/')({
  validateSearch: z.object({
    pendingId: z.string().optional(),
  }),
  component: PendingPage,
});

function PendingPage() {
  return (
    <DataTableProvider>
      <PendingCallsFiltersProvider>
        <main
          className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-24 lg:py-16
       flex flex-col items-center gap-6 lg:gap-10"
        >
          <Card className="min-w-full min-h-full flex gap-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <CircleDotDashed />
                Chamados/Pendências
              </CardTitle>
              <CardDescription>
                Aqui você pode ver, todos os seus chamados!
              </CardDescription>
            </CardHeader>

            <CardContent>
              <PendingCallsTableFromAPI />
            </CardContent>
          </Card>
        </main>
      </PendingCallsFiltersProvider>
    </DataTableProvider>
  );
}
