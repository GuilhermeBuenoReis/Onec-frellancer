'use client';

import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../../components/ui/dialog';
import type { Call } from '../types/pending-call';

interface PendingViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Call;
}

export function PendingViewDialog({
  open,
  onOpenChange,
  data,
}: PendingViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do chamado</DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="grid gap-3 text-sm text-muted-foreground"
        >
          <p>
            <strong className="text-foreground">Cliente:</strong> {data.client}
          </p>
          <p>
            <strong className="text-foreground">Motivo:</strong>{' '}
            {data.callReason}
          </p>
          <p>
            <strong className="text-foreground">Status:</strong> {data.status}
          </p>
          <p>
            <strong className="text-foreground">Prioridade:</strong>{' '}
            {data.priority}
          </p>
          <p>
            <strong className="text-foreground">Responsável:</strong>{' '}
            {data.responsible}
          </p>
          <p>
            <strong className="text-foreground">Categoria:</strong>{' '}
            {data.category}
          </p>
          <p>
            <strong className="text-foreground">Descrição:</strong>{' '}
            {data.description}
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
