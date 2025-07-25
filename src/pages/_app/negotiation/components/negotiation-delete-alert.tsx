'use client';

import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteNegotiation } from '@/generated';

interface NegotiationDeleteAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  negotiationId: string;
}

export function NegotiationDeleteAlert({
  open,
  onOpenChange,
  negotiationId,
}: NegotiationDeleteAlertProps) {
  const { mutateAsync: deleteNegotiation, isPending } = useDeleteNegotiation();

  async function handleDelete() {
    try {
      await deleteNegotiation({ id: negotiationId });
      toast.success('Negociação deletada com sucesso!');
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao deletar negociação:', error);
      toast.error('Erro ao deletar negociação');
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. A negociação será permanentemente
            removida da lista.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <motion.div
                className="flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: 'linear',
                }}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </motion.div>
            ) : (
              'Confirmar exclusão'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
