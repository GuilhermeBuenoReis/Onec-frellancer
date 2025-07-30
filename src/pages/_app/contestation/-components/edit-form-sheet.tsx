'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import {
  type UpdateContestationMutationRequest,
  updateContestationMutationRequestSchema,
  useUpdateContestation,
} from '@/generated';
import { useContestationFiltersContext } from '../-context/contestation-filters-context';

interface ContestationEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContestationEditSheet({
  open,
  onOpenChange,
}: ContestationEditSheetProps) {
  const {
    selectedContestationId,
    selectedContestationData,
    clearSelectedContestation,
  } = useContestationFiltersContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateContestationMutationRequest>({
    resolver: zodResolver(updateContestationMutationRequestSchema),
    defaultValues: {},
  });

  const { mutateAsync: updateContestation, isPending } =
    useUpdateContestation();

  useEffect(() => {
    if (selectedContestationData && open) {
      reset(selectedContestationData);
    }
  }, [selectedContestationData, open, reset]);

  async function handleUpdate(values: UpdateContestationMutationRequest) {
    if (!selectedContestationId) {
      toast.error('ID da contestação não encontrado');
      return;
    }

    try {
      await updateContestation(
        { id: selectedContestationId, data: values },
        {
          onSuccess: () => {
            toast.success('Contestação atualizada com sucesso!');
            onOpenChange(false);
            clearSelectedContestation();
          },
          onError: error => {
            toast.error(
              `Erro ao atualizar: ${error.data?.message ?? 'Erro desconhecido'}`
            );
          },
        }
      );
    } catch (err) {
      console.error(err);
      toast.error('Erro inesperado ao atualizar contestação');
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto max-h-screen p-4">
        <SheetHeader>
          <SheetTitle className="text-xl">Editar Contestação</SheetTitle>
          <SheetDescription>
            Atualize os dados da contestação selecionada.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="space-y-4 mt-6 pb-8"
        >
          <Input {...register('client')} placeholder="Cliente" />
          {errors.client && (
            <p className="text-sm text-red-500">{errors.client.message}</p>
          )}

          <Input {...register('product')} placeholder="Produto" />
          {errors.product && (
            <p className="text-sm text-red-500">{errors.product.message}</p>
          )}

          <Input {...register('competence')} placeholder="Competência" />
          {errors.competence && (
            <p className="text-sm text-red-500">{errors.competence.message}</p>
          )}

          <Input {...register('cnpj')} placeholder="CNPJ" />
          {errors.cnpj && (
            <p className="text-sm text-red-500">{errors.cnpj.message}</p>
          )}

          <Input
            type="number"
            {...register('percentage', { valueAsNumber: true })}
            placeholder="% Honorário"
          />
          {errors.percentage && (
            <p className="text-sm text-red-500">{errors.percentage.message}</p>
          )}

          <Input
            type="number"
            {...register('compensation', { valueAsNumber: true })}
            placeholder="Compensação"
          />
          {errors.compensation && (
            <p className="text-sm text-red-500">
              {errors.compensation.message}
            </p>
          )}

          <Input
            type="number"
            {...register('honorary', { valueAsNumber: true })}
            placeholder="Honorário"
          />
          {errors.honorary && (
            <p className="text-sm text-red-500">{errors.honorary.message}</p>
          )}

          <Input
            type="number"
            {...register('tax', { valueAsNumber: true })}
            placeholder="Taxa"
          />
          {errors.tax && (
            <p className="text-sm text-red-500">{errors.tax.message}</p>
          )}

          <Input
            type="number"
            {...register('valueTj', { valueAsNumber: true })}
            placeholder="Valor TJ"
          />
          {errors.valueTj && (
            <p className="text-sm text-red-500">{errors.valueTj.message}</p>
          )}

          <Input
            type="number"
            {...register('toPay', { valueAsNumber: true })}
            placeholder="Valor a pagar"
          />
          {errors.toPay && (
            <p className="text-sm text-red-500">{errors.toPay.message}</p>
          )}

          <Input {...register('status')} placeholder="Status" />
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}

          <Input {...register('observation')} placeholder="Observações" />
          {errors.observation && (
            <p className="text-sm text-red-500">{errors.observation.message}</p>
          )}

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
