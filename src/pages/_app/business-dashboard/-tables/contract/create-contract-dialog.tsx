'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  type CreateContractMutationRequestSchema,
  createContractMutationRequestSchema,
  getContractQueryKey,
  useCreateContract,
} from '@/generated';
import { queryClient } from '@/lib/query-client';

export function CreateContractDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createContract, isPending } = useCreateContract();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateContractMutationRequestSchema>({
    resolver: zodResolver(createContractMutationRequestSchema),
  });

  async function handleCreateNewContract(
    data: CreateContractMutationRequestSchema
  ) {
    await createContract(
      { data },
      {
        onSuccess: () => {
          toast.success('Contrato criado com sucesso!');
          queryClient.invalidateQueries({ queryKey: getContractQueryKey() });
          setOpen(false);
        },
        onError: err => {
          toast.error('Erro ao criar a contrato!');
          console.error(err.data.message);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex gap-2 items-center cursor-pointer"
          variant="default"
        >
          <CirclePlus size={16} />
          Nova Contrato
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Criar novo contrato</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateNewContract)}
          className="space-y-3 mt-4"
        >
          <ScrollArea className="h-[480px] w-auto">
            <div className="flex flex-col items-center gap-2">
              <Input
                {...register('client')}
                placeholder="Cliente"
                {...(errors.client?.message && (
                  <p className="text-red-700">{errors.client.message}</p>
                ))}
              />

              <Input placeholder="Cidade" {...register('city')} />
              {errors.city && (
                <p className="text-red-700">{errors.city.message}</p>
              )}

              <Input placeholder="Cliente" {...register('client')} />
              {errors.client && (
                <p className="text-red-700">{errors.client.message}</p>
              )}

              <Input placeholder="Estado" {...register('state')} />
              {errors.state && (
                <p className="text-red-700">{errors.state.message}</p>
              )}

              <Input placeholder="CNPJ" {...register('cnpj')} />
              {errors.cnpj && (
                <p className="text-red-700">{errors.cnpj.message}</p>
              )}

              <Input placeholder="Síndico" {...register('sindic')} />
              {errors.sindic && (
                <p className="text-red-700">{errors.sindic.message}</p>
              )}

              <Input placeholder="Ano" {...register('year')} />
              {errors.year && (
                <p className="text-red-700">{errors.year.message}</p>
              )}

              <Input placeholder="Assunto" {...register('matter')} />
              {errors.matter && (
                <p className="text-red-700">{errors.matter.message}</p>
              )}

              <Input placeholder="Previsão" {...register('forecast')} />
              {errors.forecast && (
                <p className="text-red-700">{errors.forecast.message}</p>
              )}

              <Input
                placeholder="Total do contrato"
                {...register('contractTotal', {
                  setValueAs: value => Number(value),
                })}
              />
              {errors.contractTotal && (
                <p className="text-red-700">{errors.contractTotal.message}</p>
              )}

              <Input
                type="number"
                placeholder="Percentual"
                {...register('percentage', {
                  setValueAs: value => Number(value),
                })}
              />
              {errors.percentage && (
                <p className="text-red-700">{errors.percentage.message}</p>
              )}

              <Input
                placeholder="Contrato assinado"
                {...register('signedContract')}
              />
              {errors.signedContract && (
                <p className="text-red-700">{errors.signedContract.message}</p>
              )}

              <Input placeholder="Status" {...register('status')} />
              {errors.status && (
                <p className="text-red-700">{errors.status.message}</p>
              )}

              <Input
                type="number"
                placeholder="Guia média"
                {...register('averageGuide', {
                  setValueAs: value => Number(value),
                })}
              />
              {errors.averageGuide && (
                <p className="text-red-700">{errors.averageGuide.message}</p>
              )}

              <Input placeholder="Parceiro" {...register('partner')} />
              {errors.partner && (
                <p className="text-red-700">{errors.partner.message}</p>
              )}

              <Input
                type="number"
                placeholder="Comissão do parceiro"
                {...register('partnerCommission', {
                  setValueAs: value => Number(value),
                })}
              />
              {errors.partnerCommission && (
                <p className="text-red-700">
                  {errors.partnerCommission.message}
                </p>
              )}

              <Input placeholder="Counter" {...register('counter')} />
              {errors.counter && (
                <p className="text-red-700">{errors.counter.message}</p>
              )}

              <Input placeholder="Email" {...register('email')} />
              {errors.email && (
                <p className="text-red-700">{errors.email.message}</p>
              )}

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isPending}
              >
                {isPending ? 'Salvando...' : 'Salvar negociação'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() =>
                  reset({
                    city: '',
                    client: '',
                    state: '',
                    cnpj: '',
                    sindic: '',
                    year: '',
                    matter: '',
                    forecast: '',
                    contractTotal: '',
                    percentage: 0,
                    signedContract: '',
                    status: '',
                    averageGuide: 0,
                    partner: '',
                    partnerCommission: 0,
                    counter: '',
                    email: '',
                  })
                }
              >
                Limpar campos
              </Button>
            </div>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
}
