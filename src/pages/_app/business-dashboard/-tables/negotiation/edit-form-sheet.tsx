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
import { Textarea } from '@/components/ui/textarea';
import {
  type GetNegotiation200,
  getNegotiationQueryKey,
  type UpdateNegotiationMutationRequestSchema,
  updateNegotiationMutationRequestSchema,
  useUpdateNegotiation,
} from '@/generated';
import { queryClient } from '@/lib/query-client';
import { useNegotiationContext } from '../../-context/negotiation-context';

interface NegotiationFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NegotiationEditSheet({
  open,
  onOpenChange,
}: NegotiationFormSheetProps) {
  const { negotiationId, negotiationData } = useNegotiationContext();

  const { mutateAsync: updateNegotiation, isPending } = useUpdateNegotiation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateNegotiationMutationRequestSchema>({
    resolver: zodResolver(updateNegotiationMutationRequestSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (negotiationData && open) {
      reset(negotiationData! as UpdateNegotiationMutationRequestSchema);
    }
  }, [negotiationData, open, reset]);

  useEffect(() => {
    console.log('FORM ERRORS:', errors);
  }, [errors]);

  async function handleSubmitNegotiationUpdate(
    values: UpdateNegotiationMutationRequestSchema
  ) {
    if (!negotiationId) return toast.error('Negociação não encontrada!');

    console.log('Submitting negotiation update:', values);

    try {
      await updateNegotiation(
        {
          id: negotiationId,
          data: values,
        },
        {
          onSuccess: data => {
            const updated = data.data.negotiation;

            queryClient.setQueryData(
              ['negotiation'],
              (old: GetNegotiation200 = []) => {
                if (!old || !Array.isArray(old)) return [];

                const newList = [
                  updated,
                  ...old.filter(item => item.id !== updated.id),
                ];

                return newList;
              }
            );

            queryClient.invalidateQueries({
              queryKey: getNegotiationQueryKey(),
            });
            toast.success('Negociação atualizada!');
            onOpenChange(false);
          },
          onError: error => {
            toast.error(`Erro ao atualizar negociação: ${error.data.message}`);
          },
        }
      );
    } catch (error) {
      console.error('Erro ao atualizar negociação:', error);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto max-h-screen p-4">
        <SheetHeader>
          <SheetTitle className="text-xl">Editar negociação</SheetTitle>
          <SheetDescription>
            Atualize os dados da negociação selecionada abaixo.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleSubmitNegotiationUpdate)}
          className="space-y-4 mt-6 pb-8"
        >
          <Input
            {...register('title')}
            placeholder="Título da negociação"
            className="w-full"
            {...(errors.title?.message && (
              <p className="text-red-700">{errors.title?.message}</p>
            ))}
          />

          <Input
            {...register('client')}
            placeholder="Cliente"
            className="w-full"
            {...(errors.client?.message && (
              <p className="text-red-700">{errors.client?.message}</p>
            ))}
          />

          <Input
            {...register('user')}
            placeholder="Usuário responsável"
            className="w-full"
            {...(errors.user?.message && (
              <p className="text-red-700">{errors.user?.message}</p>
            ))}
          />

          <Input
            {...register('tags')}
            placeholder="Tags"
            className="w-full"
            {...(errors.tags?.message && (
              <p className="text-red-700">{errors.tags?.message}</p>
            ))}
          />

          <Input
            {...register('step')}
            placeholder="Etapa"
            className="w-full"
            {...(errors.step?.message && (
              <p className="text-red-700">{errors.step?.message}</p>
            ))}
          />

          <Input
            {...register('status')}
            placeholder="Status"
            className="w-full"
            {...(errors.status?.message && (
              <p className="text-red-700">{errors.status?.message}</p>
            ))}
          />

          <Input
            type="number"
            {...register('value')}
            placeholder="Valor"
            className="w-full"
            {...(errors.value?.message && (
              <p className="text-red-700">{errors.value?.message}</p>
            ))}
          />

          <Input
            type="date"
            {...register('startsDate')}
            placeholder="Data de início"
            className="w-full"
            {...(errors.startsDate?.message && (
              <p className="text-red-700">{errors.startsDate?.message}</p>
            ))}
          />

          <Input
            {...register('partnerId')}
            placeholder="Paceiro"
            className="w-full"
            {...(errors.partnerId?.message && (
              <p className="text-red-700">{errors.partnerId?.message}</p>
            ))}
          />

          <Input
            type="number"
            {...register('averageGuide')}
            placeholder="Média guia"
            className="w-full"
            {...(errors.averageGuide?.message && (
              <p className="text-red-700">{errors.averageGuide?.message}</p>
            ))}
          />

          <Textarea
            {...register('observation')}
            placeholder="Observação"
            className="w-full"
            {...(errors.observation?.message && (
              <p className="text-red-700">{errors.observation?.message}</p>
            ))}
          />

          <Button type="submit" className="w-full mt-4">
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
