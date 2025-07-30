'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
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
  type CreateContestationMutationRequest,
  createContestationMutationRequestSchema,
  getContestationQueryKey,
  useCreateContestation,
} from '@/generated';
import { queryClient } from '@/lib/query-client';

export function ContestationCreateDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createContestation, isPending } =
    useCreateContestation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateContestationMutationRequest>({
    resolver: zodResolver(createContestationMutationRequestSchema),
  });

  async function handleCreate(data: CreateContestationMutationRequest) {
    await createContestation(
      { data },
      {
        onSuccess: () => {
          toast.success('Contestação criada com sucesso!');
          queryClient.invalidateQueries({
            queryKey: getContestationQueryKey(),
          });
          setOpen(false);
          reset();
        },
        onError: err => {
          toast.error('Erro ao criar contestação!');
          console.error(err);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <CirclePlus className="w-4 h-4" />
          Nova contestação
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Criar nova contestação
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4 mt-4">
          <ScrollArea className="max-h-[500px] space-y-4">
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
              <p className="text-sm text-red-500">
                {errors.competence.message}
              </p>
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
              <p className="text-sm text-red-500">
                {errors.percentage.message}
              </p>
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
              <p className="text-sm text-red-500">
                {errors.observation.message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Criando...' : 'Criar contestação'}
            </Button>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
}
