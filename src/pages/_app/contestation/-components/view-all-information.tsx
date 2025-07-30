'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetContestationById } from '@/generated/hooks/contestationHooks/useGetContestationById';
import { useContestationFiltersContext } from '../-context/contestation-filters-context';

interface ContestationViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContestationViewDialog({
  open,
  onOpenChange,
}: ContestationViewDialogProps) {
  const { selectedContestationId } = useContestationFiltersContext();

  const {
    data: getInformationContestation,
    isLoading,
    isError,
  } = useGetContestationById(selectedContestationId ?? '', {
    query: {
      enabled: !!selectedContestationId,
    },
  });

  if (!getInformationContestation) return;

  const contestation = getInformationContestation.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes da contestação</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground text-sm">
            <Loader2 className="size-4 animate-spin" />
            Carregando dados da contestação...
          </div>
        ) : isError || !getInformationContestation ? (
          <p className="text-sm text-destructive">
            Erro ao carregar contestação.
          </p>
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
              {contestation.client}
            </p>
            <p>
              <strong className="text-foreground">Produto:</strong>{' '}
              {contestation.product}
            </p>
            <p>
              <strong className="text-foreground">Competência:</strong>{' '}
              {contestation.competence}
            </p>
            <p>
              <strong className="text-foreground">CNPJ:</strong>{' '}
              {contestation.cnpj}
            </p>
            <p>
              <strong className="text-foreground">% Honorário:</strong>{' '}
              {contestation.percentage}%
            </p>
            <p>
              <strong className="text-foreground">Compensação:</strong> R${' '}
              {contestation.compensation?.toFixed(2)}
            </p>
            <p>
              <strong className="text-foreground">Honorário:</strong> R${' '}
              {contestation.honorary?.toFixed(2)}
            </p>
            <p>
              <strong className="text-foreground">Taxa:</strong> R${' '}
              {contestation.tax?.toFixed(2)}
            </p>
            <p>
              <strong className="text-foreground">Valor TJ:</strong> R${' '}
              {contestation.valueTj?.toFixed(2)}
            </p>
            <p>
              <strong className="text-foreground">A pagar:</strong> R${' '}
              {contestation.toPay?.toFixed(2)}
            </p>
            <p>
              <strong className="text-foreground">Status:</strong>{' '}
              {contestation.status}
            </p>
            <p>
              <strong className="text-foreground">Observações:</strong>{' '}
              {contestation.observation || '-'}
            </p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
