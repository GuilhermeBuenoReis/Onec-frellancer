'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { type GetContract200, useUpdateContract } from '@/generated';
import { updateContractMutationRequestSchema } from '@/generated/zod/contractSchemas/updateContractSchema';
import { queryClient } from '@/lib/query-client';
import { useContractContext } from '../../-context/contract-context';

export type ContractFormData = z.infer<
  typeof updateContractMutationRequestSchema
>;

interface ContractEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContractEditSheet({
  open,
  onOpenChange,
}: ContractEditSheetProps) {
  const { id, contractData } = useContractContext();

  const { mutateAsync: updateNegotiation, isPending } = useUpdateContract();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContractFormData>({
    resolver: zodResolver(updateContractMutationRequestSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (contractData && open) {
      reset(contractData);
    }
  }, [contractData, open, reset]);

  useEffect(() => {
    console.log('FORM ERRORS:', errors);
  }, [errors]);

  async function handleSubmitNegotiationUpdate(values: ContractFormData) {
    values.id = id;
    console.log('ENVIANDO:', values);

    if (!values.id) return toast.error('Negociação não encontrada!');
    try {
      await updateNegotiation(
        {
          id: values.id,
          data: values,
        },
        {
          onSuccess: data => {
            const updated = data.data.contract;

            queryClient.setQueryData(
              ['contracts'],
              (old: GetContract200 = []) => {
                if (!old || !Array.isArray(old)) return [];

                const newList = [
                  updated,
                  ...old.filter(item => item.id !== updated.id),
                ];

                return newList;
              }
            );

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
            {...register('city')}
            placeholder="Cidade"
            className="w-full"
            {...(errors.city && {
              'aria-invalid': true,
              'aria-describedby': 'city-error',
            })}
          />

          <Input
            {...register('client')}
            placeholder="Cliente"
            className="w-full"
            {...(errors.client && {
              'aria-invalid': true,
              'aria-describedby': 'client-error',
            })}
          />

          <Input
            {...register('state')}
            placeholder="Estado"
            className="w-full"
            {...(errors.state && {
              'aria-invalid': true,
              'aria-describedby': 'state-error',
            })}
          />

          <Input
            {...register('sindic')}
            placeholder="Síndico"
            className="w-full"
            {...(errors.sindic && {
              'aria-invalid': true,
              'aria-describedby': 'sindic-error',
            })}
          />

          <Input
            {...register('year')}
            placeholder="Ano"
            className="w-full"
            {...(errors.year && {
              'aria-invalid': true,
              'aria-describedby': 'year-error',
            })}
          />

          <Input
            {...register('status')}
            placeholder="Status"
            className="w-full"
            {...(errors.status && {
              'aria-invalid': true,
              'aria-describedby': 'status-error',
            })}
          />

          <Input
            {...register('matter')}
            placeholder="Matéria"
            className="w-full"
            {...(errors.matter && {
              'aria-invalid': true,
              'aria-describedby': 'matter-error',
            })}
          />

          <Input {...register('cnpj')} placeholder="CNPJ" className="w-full" />

          <Input
            {...register('forecast')}
            placeholder="Previsão"
            className="w-full"
            {...(errors.forecast && {
              'aria-invalid': true,
              'aria-describedby': 'forecast-error',
            })}
          />

          <Input
            {...register('contractTotal')}
            placeholder="Total do contrato"
            className="w-full"
            {...(errors.contractTotal && {
              'aria-invalid': true,
              'aria-describedby': 'contractTotal-error',
            })}
          />

          <Input
            {...register('percentage')}
            type="number"
            placeholder="Percentual"
            className="w-full"
            {...(errors.percentage && {
              'aria-invalid': true,
              'aria-describedby': 'percentage-error',
            })}
          />

          <Input
            {...register('signedContract')}
            placeholder="Contrato assinado"
            className="w-full"
            {...(errors.signedContract && {
              'aria-invalid': true,
              'aria-describedby': 'signedContract-error',
            })}
          />

          <Input
            {...register('averageGuide')}
            type="number"
            placeholder="Guia média"
            className="w-full"
            {...(errors.averageGuide && {
              'aria-invalid': true,
              'aria-describedby': 'averageGuide-error',
            })}
          />

          <Input
            {...register('partner')}
            placeholder="Parceiro"
            className="w-full"
            {...(errors.partner && {
              'aria-invalid': true,
              'aria-describedby': 'partner-error',
            })}
          />

          <Input
            {...register('partnerCommission')}
            type="number"
            placeholder="Comissão do parceiro"
            className="w-full"
            {...(errors.partnerCommission && {
              'aria-invalid': true,
              'aria-describedby': 'partnerCommission-error',
            })}
          />

          <Input
            {...register('counter')}
            placeholder="Contador"
            className="w-full"
            {...(errors.counter && {
              'aria-invalid': true,
              'aria-describedby': 'counter-error',
            })}
          />

          <Input
            {...register('email')}
            placeholder="E-mail"
            className="w-full"
            {...(errors.email && {
              'aria-invalid': true,
              'aria-describedby': 'email-error',
            })}
          />

          <Button type="submit" className="w-full mt-4">
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
