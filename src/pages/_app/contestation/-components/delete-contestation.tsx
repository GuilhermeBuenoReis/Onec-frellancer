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
import { getContestationQueryKey, useDeleteContestation } from '@/generated';
import { queryClient } from '@/lib/query-client';
import { useContestationFiltersContext } from '../-context/contestation-filters-context';

interface ContestationDeleteAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContestationDeleteAlert({
  open,
  onOpenChange,
}: ContestationDeleteAlertProps) {
  const { selectedContestationId } = useContestationFiltersContext();
  const { mutateAsync: deleteContestation } = useDeleteContestation();

  async function handleDeleteContestation() {
    if (!selectedContestationId) return;

    await deleteContestation(
      { id: selectedContestationId },
      {
        onSuccess: () => {
          toast.success('Contestação deletada com sucesso!');
          queryClient.invalidateQueries({
            queryKey: getContestationQueryKey(),
          });
          onOpenChange(false);
        },
        onError: () => {
          toast.error('Erro ao deletar a contestação!');
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
              Essa ação vai deletar a contestação permanentemente e não poderá
              ser desfeita.
            </AlertDescription>
          </div>
        </Alert>

        <DialogFooter className="flex flex-row-reverse justify-end gap-2">
          <Button variant="destructive" onClick={handleDeleteContestation}>
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
