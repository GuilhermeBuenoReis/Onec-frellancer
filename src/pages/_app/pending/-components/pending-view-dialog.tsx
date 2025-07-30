'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetOnePending } from '@/generated/hooks/pendingsHooks/useGetOnePending';
import { usePendingCallsFiltersContext } from '../-context/pending-calls-filter-context';

interface PendingViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PendingViewDialog({
  open,
  onOpenChange,
}: PendingViewDialogProps) {
  const { selectedPendingId } = usePendingCallsFiltersContext();

  const {
    data: getInformationPending,
    isLoading,
    isError,
  } = useGetOnePending(selectedPendingId ?? '', {
    query: {
      enabled: !!selectedPendingId,
    },
  });

  if (!getInformationPending) {
    return;
  }

  const pending = getInformationPending.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do chamado</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground text-sm">
            <Loader2 className="size-4 animate-spin" />
            Carregando dados do chamado...
          </div>
        ) : isError || !getInformationPending ? (
          <p className="text-sm text-destructive">Erro ao carregar chamado.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-3 text-sm text-muted-foreground"
          >
            <p>
              <strong className="text-foreground">Cliente:</strong>{' '}
              {pending.client}
            </p>
            <p>
              <strong className="text-foreground">Motivo:</strong>{' '}
              {pending.callReason}
            </p>
            <p>
              <strong className="text-foreground">Status:</strong>{' '}
              {pending.status}
            </p>
            <p>
              <strong className="text-foreground">Prioridade:</strong>{' '}
              {pending.priority}
            </p>
            <p>
              <strong className="text-foreground">Responsável:</strong>{' '}
              {pending.responsible}
            </p>
            <p>
              <strong className="text-foreground">Categoria:</strong>{' '}
              {pending.category}
            </p>
            <p>
              <strong className="text-foreground">Descrição:</strong>{' '}
              {pending?.description}
            </p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
