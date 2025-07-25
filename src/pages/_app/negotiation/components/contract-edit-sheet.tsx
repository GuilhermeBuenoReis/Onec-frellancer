'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { UpdateContractMutationRequest } from '@/generated';
import { useUpdateContract } from '@/generated';
import {
  type ContractFormData,
  contractSchema,
} from '../types/schemas/contract-schema';

interface ContractEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ContractFormData;
  onSave: (values: ContractFormData) => void;
}

const fieldLabels: Record<keyof ContractFormData, string> = {
  id: 'Id',
  city: 'Cidade',
  client: 'Cliente',
  state: 'Estado',
  cnpj: 'CNPJ',
  sindic: 'Síndico',
  year: 'Ano',
  matter: 'Matéria',
  forecast: 'Previsão',
  contractTotal: 'Total do Contrato',
  percentage: 'Porcentagem',
  signedContract: 'Contrato Assinado',
  status: 'Status',
  averageGuide: 'Guia Média',
  partner: 'Parceiro',
  partnerCommission: 'Comissão do Parceiro',
  counter: 'Contador',
  email: 'E-mail',
};

function sanitizeToMutationPayload(
  data: ContractFormData
): UpdateContractMutationRequest {
  return {
    client: data.client ?? undefined,
    city: data.city ?? undefined,
    state: data.state ?? undefined,
    cnpj: data.cnpj ?? undefined,
    sindic: data.sindic ?? undefined,
    year: data.year ?? undefined,
    matter: data.matter ?? undefined,
    forecast: data.forecast ?? undefined,
    contractTotal: data.contractTotal ?? undefined,
    signedContract: data.signedContract ?? undefined,
    status: data.status ?? undefined,
    averageGuide: data.averageGuide ?? undefined,
    partner: data.partner ?? undefined,
    partnerCommission: data.partnerCommission ?? undefined,
    counter: data.counter ?? undefined,
    email: data.email ?? undefined,
  };
}

export function ContractEditSheet({
  open,
  onOpenChange,
  data,
  onSave,
}: ContractEditSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: data,
  });

  const { mutateAsync: updateNegotiation, isPending } = useUpdateContract();

  useEffect(() => {
    if (open) reset(data);
  }, [open, data, reset]);

  async function handleSubmitNegotiationUpdate(values: ContractFormData) {
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
                {fieldLabels[key as keyof ContractFormData]}
              </label>
              <Input
                {...register(key as keyof ContractFormData)}
                disabled={isPending}
              />
              {errors[key as keyof ContractFormData] && (
                <p className="text-sm text-red-500">
                  {String(errors[key as keyof ContractFormData]?.message)}
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
