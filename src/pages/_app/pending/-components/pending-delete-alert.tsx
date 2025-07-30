'use client';

import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeletePending } from '@/generated';
import { usePendingCallsFiltersContext } from '../-context/pending-calls-filter-context';

interface PendingDeleteAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PendingDeleteAlert({
  open,
  onOpenChange,
}: PendingDeleteAlertProps) {
  const { pendingId } = usePendingCallsFiltersContext();

  const { mutateAsync: deletePending } = useDeletePending();

  async function handleDeletePending() {
    if (!pendingId) {
      return;
    }
    await deletePending(
      { id: pendingId },
      {
        onSuccess: () => {
          toast.success('Pendência deletada com sucesso!');
        },
        onError: () => {
          toast.success('Erro ao deletar a pendência!');
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
        </DialogHeader>

        <Alert variant="destructive" className="flex gap-4">
          <AlertTriangle className="h-6 w-6" />
          <div>
            <AlertTitle>Tem certeza disso?</AlertTitle>
            <AlertDescription>
              Essa ação vai deletar o chamado permanentemente e não poderá ser
              desfeita.
            </AlertDescription>
          </div>
        </Alert>

        <DialogFooter className="flex flex-row-reverse justify-end gap-2">
          <Button variant="destructive" onClick={handleDeletePending}>
            Deletar
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
