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
import { getPartnersQueryKey, useDeletePartner } from '@/generated';
import { queryClient } from '@/lib/query-client';
import { useDashboardProvider } from '../-context/dashboard-context';

interface DeletePartnerAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeletePartnerAlert({
  open,
  onOpenChange,
}: DeletePartnerAlertProps) {
  const { mutateAsync: deletePartner, isPending } = useDeletePartner();
  const { partnerId } = useDashboardProvider();

  async function handleDeletePartner() {
    await deletePartner(
      { id: partnerId },
      {
        onSuccess: () => {
          toast.success('Parceiro deletado!');
          queryClient.invalidateQueries({ queryKey: getPartnersQueryKey() });
        },
        onError: err => {
          toast.error('Erro ao deletar Parceiro!');
          console.error(err);
        },
      }
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. O Parceiro será permanentemente
            removido da lista.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDeletePartner}
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
