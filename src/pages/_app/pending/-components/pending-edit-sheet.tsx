'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import type { UpdatePendingMutationRequest } from '@/generated';
import {
  updatePendingMutationRequestSchema,
  useUpdatePending,
} from '@/generated';
import { usePendingCallsFiltersContext } from '../-context/pending-calls-filter-context';

const statusOptions = ['Aberto', 'Encaminhado', 'Pendente', 'Concluído'];
const categoryOptions = [
  'SAC',
  'Atendimento',
  'Financeiro',
  'Diretoria',
  'Comercial',
  'Auditoria',
];

interface PendingEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PendingEditSheet({
  open,
  onOpenChange,
}: PendingEditSheetProps) {
  const { selectedPendingId, selectedPendingData, clearSelectedPending } =
    usePendingCallsFiltersContext();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdatePendingMutationRequest>({
    resolver: zodResolver(updatePendingMutationRequestSchema),
    defaultValues: {},
  });

  const { mutateAsync: updatePending, isPending } = useUpdatePending();

  useEffect(() => {
    if (selectedPendingData && open) {
      reset(selectedPendingData);
    }
  }, [selectedPendingData, open, reset]);

  async function handleUpdate(values: UpdatePendingMutationRequest) {
    if (!selectedPendingId) {
      toast.error('ID do chamado não encontrado');
      return;
    }

    try {
      await updatePending(
        { id: selectedPendingId, data: values },
        {
          onSuccess: () => {
            toast.success('Chamado atualizado com sucesso!');
            onOpenChange(false);
            clearSelectedPending();
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
      toast.error('Erro inesperado ao atualizar chamado');
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto max-h-screen p-4">
        <SheetHeader>
          <SheetTitle className="text-xl">Editar Chamado</SheetTitle>
          <SheetDescription>
            Atualize os dados do chamado selecionado.
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

          <Input {...register('callReason')} placeholder="Motivo" />
          {errors.callReason && (
            <p className="text-sm text-red-500">{errors.callReason.message}</p>
          )}

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <div>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>
            )}
          />

          <Input {...register('priority')} placeholder="Prioridade" />
          {errors.priority && (
            <p className="text-sm text-red-500">{errors.priority.message}</p>
          )}

          <Input {...register('responsible')} placeholder="Responsável" />
          {errors.responsible && (
            <p className="text-sm text-red-500">{errors.responsible.message}</p>
          )}

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <div>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>
            )}
          />

          <Input {...register('description')} placeholder="Descrição" />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
