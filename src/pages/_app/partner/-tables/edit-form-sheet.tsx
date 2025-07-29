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
import type { UpdatePortalControllMutationRequest } from '@/generated';
import {
  updatePortalControllMutationRequestSchema,
  useUpdatePortalControll,
} from '@/generated';
import { useDashboardProvider } from '../-context/dashboard-context';

interface PortalControllEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PortalControllEditSheet({
  open,
  onOpenChange,
}: PortalControllEditSheetProps) {
  const { selectedControllId, selectedControllData } = useDashboardProvider();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePortalControllMutationRequest>({
    resolver: zodResolver(updatePortalControllMutationRequestSchema),
    defaultValues: {},
  });

  const { mutateAsync: updateControll, isPending } = useUpdatePortalControll();

  useEffect(() => {
    if (selectedControllData && open) {
      reset(selectedControllData);
    }
  }, [selectedControllData, open, reset]);

  async function handleUpdate(values: UpdatePortalControllMutationRequest) {
    if (!selectedControllId) {
      toast.error('ID do honorário não encontrado');
      return;
    }

    try {
      await updateControll(
        { id: selectedControllId, data: values },
        {
          onSuccess: () => {
            toast.success('Honorário atualizado com sucesso!');
            onOpenChange(false);
          },
          onError: error => {
            toast.error(`Erro ao atualizar: ${error.data.message}`);
          },
        }
      );
    } catch (err) {
      console.error(err);
      toast.error('Erro inesperado ao atualizar honorário');
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto max-h-screen p-4">
        <SheetHeader>
          <SheetTitle className="text-xl">Editar Honorário</SheetTitle>
          <SheetDescription>
            Atualize os dados do registro selecionado.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="space-y-4 mt-6 pb-8"
        >
          <div>
            <Input {...register('enterprise')} placeholder="Empresa" />
            {errors.enterprise && (
              <p className="text-red-700 text-sm mt-1">
                {errors.enterprise.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('product')} placeholder="Produto" />
            {errors.product && (
              <p className="text-red-700 text-sm mt-1">
                {errors.product.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register('percentageHonorary', { valueAsNumber: true })}
              placeholder="% Honorário"
            />
            {errors.percentageHonorary && (
              <p className="text-red-700 text-sm mt-1">
                {errors.percentageHonorary.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register('compensation', { valueAsNumber: true })}
              placeholder="Compensação"
            />
            {errors.compensation && (
              <p className="text-red-700 text-sm mt-1">
                {errors.compensation.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register('honorary', { valueAsNumber: true })}
              placeholder="Honorário"
            />
            {errors.honorary && (
              <p className="text-red-700 text-sm mt-1">
                {errors.honorary.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register('tax', { valueAsNumber: true })}
              placeholder="Imposto"
            />
            {errors.tax && (
              <p className="text-red-700 text-sm mt-1">{errors.tax.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register('tj', { valueAsNumber: true })}
              placeholder="Tributo | TJ"
            />
            {errors.tj && (
              <p className="text-red-700 text-sm mt-1">{errors.tj.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register('value', { valueAsNumber: true })}
              placeholder="Valor Total"
            />
            {errors.value && (
              <p className="text-red-700 text-sm mt-1">
                {errors.value.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('situation')} placeholder="Situação" />
            {errors.situation && (
              <p className="text-red-700 text-sm mt-1">
                {errors.situation.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('partnerId')} placeholder="Parceiro" />
            {errors.partnerId && (
              <p className="text-red-700 text-sm mt-1">
                {errors.partnerId.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-4">
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
