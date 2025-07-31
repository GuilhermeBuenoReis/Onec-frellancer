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
import {
  getPortalControllsBySelectParternRouteQueryKey,
  useDeletePortalControll,
} from '@/generated';
import { queryClient } from '@/lib/query-client';
import { useDashboardProvider } from '../-context/dashboard-context';
import { usePortalControllContext } from '../-context/portal-controll-context';

interface PortalControllDeleteAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PortalControllDeleteAlert({
  open,
  onOpenChange,
}: PortalControllDeleteAlertProps) {
  const { mutateAsync: deleteControll, isPending } = useDeletePortalControll();
  const { controllId } = usePortalControllContext();
  const { partnerId } = useDashboardProvider();

  async function handleDeleteControll() {
    if (!controllId) {
      toast.error('ID do honorário não encontrado');
      return;
    }

    try {
      await deleteControll({ id: controllId });
      toast.success('Honorário deletado com sucesso!');

      queryClient.invalidateQueries({
        queryKey: getPortalControllsBySelectParternRouteQueryKey({ partnerId }),
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao deletar honorário:', error);
      toast.error('Erro ao deletar honorário');
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. O honorário será permanentemente
            removido da lista.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDeleteControll}
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
