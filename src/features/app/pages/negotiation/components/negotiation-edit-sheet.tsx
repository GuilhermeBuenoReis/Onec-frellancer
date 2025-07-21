'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../../../../../components/ui/sheet';
import type { UpdateNegotiationMutationRequest } from '../../../../../generated';
import { useUpdateNegotiation } from '../../../../../generated';
import {
  type NegotiationFormData,
  negotiationSchema,
} from '../types/schemas/negotiation-schema';

interface NegotiationEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: NegotiationFormData;
  onSave: (values: NegotiationFormData) => void;
}

const fieldLabels: Record<keyof NegotiationFormData, string> = {
  id: 'ID',
  title: 'Título',
  client: 'Cliente',
  user: 'Usuário',
  tags: 'Tags',
  step: 'Etapa',
  status: 'Status',
  value: 'Valor',
  startsDate: 'Data de Início',
  observation: 'Observação',
  averageGuide: 'Guia Média',
  partnerId: 'Parceiro',
};

function sanitizeToMutationPayload(
  data: NegotiationFormData
): UpdateNegotiationMutationRequest {
  return {
    title: data.title ?? undefined,
    client: data.client ?? undefined,
    user: data.user ?? undefined,
    tags: data.tags ?? undefined,
    step: data.step ?? undefined,
    status: data.status,
    value: data.value ?? undefined,
    startsDate: data.startsDate ?? undefined,
    observation: data.observation ?? undefined,
    averageGuide: data.averageGuide ?? undefined,
    partnerId: data.partnerId ?? undefined,
  };
}

export function NegotiationEditSheet({
  open,
  onOpenChange,
  data,
  onSave,
}: NegotiationEditSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NegotiationFormData>({
    resolver: zodResolver(negotiationSchema),
    defaultValues: data,
  });

  const { mutateAsync: updateNegotiation, isPending } = useUpdateNegotiation();

  useEffect(() => {
    if (open) reset(data);
  }, [open, data, reset]);

  async function handleSubmitNegotiationUpdate(values: NegotiationFormData) {
    if (!values.id) return;
    try {
      await updateNegotiation({
        id: values.id,
        data: sanitizeToMutationPayload(values),
      });
      onSave(values);
      onOpenChange(false);
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
          {Object.keys(fieldLabels).map(key => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                {fieldLabels[key as keyof NegotiationFormData]}
              </label>
              <Input
                {...register(key as keyof NegotiationFormData)}
                disabled={isPending}
              />
              {errors[key as keyof NegotiationFormData] && (
                <p className="text-sm text-red-500">
                  {String(errors[key as keyof NegotiationFormData]?.message)}
                </p>
              )}
            </div>
          ))}

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
