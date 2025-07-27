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
import { getContractQueryKey, useDeleteContract } from '@/generated';
import { queryClient } from '@/lib/query-client';
import { useContractContext } from '../../-context/contract-context';

interface DeleteAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContractDeleteAlert({ open, onOpenChange }: DeleteAlertProps) {
  const { mutateAsync: deleteContract, isPending } = useDeleteContract();
  const { contractId } = useContractContext();

  async function handleDelete() {
    try {
      await deleteContract({ id: contractId });
      toast.success('Contrato deletada com sucesso!');
      queryClient.invalidateQueries({ queryKey: getContractQueryKey() });
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao deletar contrato:', error);
      toast.error('Erro ao deletar contrato');
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. O contrato será permanentemente
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
