'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetNegotiationById } from '@/generated';
import { useNegotiationContext } from '../../-context/negotiation-context';

const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, l => l.toUpperCase())
    .replace('Id', 'ID')
    .replace('Starts Date', 'Data de Início')
    .replace('Average Guide', 'Guia Média');
};

const formatValue = (value: unknown) => {
  if (value === null || value === undefined) return 'Não informado';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'number') return value.toLocaleString('pt-BR');
  return String(value);
};

interface NegotiationViewAllInformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NegotiationViewAllInformationDialog({
  open,
  onOpenChange,
}: NegotiationViewAllInformationDialogProps) {
  const { negotiationId } = useNegotiationContext();

  const { data: negotiation } = useGetNegotiationById(negotiationId);

  const allNegotiation = negotiation?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes da negociação</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1 text-sm text-muted-foreground">
          {Object.entries(allNegotiation || {}).map(([key, value]) => {
            return (
              <div key={key} className="flex flex-col">
                <span className="text-xs font-medium text-zinc-500">
                  {formatLabel(key)}
                </span>
                <span className="text-base text-zinc-900 dark:text-zinc-50">
                  {formatValue(value)}
                </span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
