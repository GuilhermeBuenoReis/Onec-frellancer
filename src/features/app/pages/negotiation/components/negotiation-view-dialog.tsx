'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../../components/ui/dialog';
import type { NegotiationTypeData } from '../types/negotiation-type-data';

interface NegotiationViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: NegotiationTypeData;
}

export function NegotiationViewDialog({
  open,
  onOpenChange,
  data,
}: NegotiationViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes da negociação/contrato!</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1 text-sm text-muted-foreground">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-xs font-medium text-zinc-500">
                {key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, l => l.toUpperCase())}
              </span>
              <span className="text-base text-zinc-900 dark:text-zinc-50">
                {typeof value === 'number'
                  ? value.toLocaleString('pt-BR')
                  : value}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
