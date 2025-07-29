'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetPortalControllsBySelectById } from '@/generated';
import { useDashboardProvider } from '../-context/dashboard-context';

const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, l => l.toUpperCase())
    .replace('Id', 'ID')
    .replace('Tj', 'Tributo | TJ')
    .replace('Tax', 'Imposto')
    .replace('Fee', 'Honorário')
    .replace('Starts Date', 'Data de Início')
    .replace('Average Guide', 'Guia Média')
    .replace('Percentage Honorary', '% Honorário')
    .replace('Partner', 'Parceiro');
};

const formatValue = (value: unknown) => {
  if (value === null || value === undefined) return 'Não informado';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'number') return value.toLocaleString('pt-BR');
  return String(value);
};

interface PortalControllViewAllInformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PortalControllViewAllInformationDialog({
  open,
  onOpenChange,
}: PortalControllViewAllInformationDialogProps) {
  const { selectedControllId } = useDashboardProvider();

  const { data } = useGetPortalControllsBySelectById(selectedControllId ?? '', {
    query: { enabled: !!selectedControllId },
  });

  const controll = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do honorário</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1 text-sm text-muted-foreground">
          {Object.entries(controll || {}).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-xs font-medium text-zinc-500">
                {formatLabel(key)}
              </span>
              <span className="text-base text-zinc-900 dark:text-zinc-50">
                {formatValue(value)}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
