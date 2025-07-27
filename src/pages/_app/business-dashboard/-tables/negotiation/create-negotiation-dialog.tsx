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
import {
  type CreateDataNegotiationMutationRequest,
  createDataNegotiationMutationRequestSchema,
  getNegotiationQueryKey,
  useCreateDataNegotiation,
} from '@/generated';
import { queryClient } from '@/lib/query-client';

export function CreateNegotiationDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createNegotiation, isPending } =
    useCreateDataNegotiation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDataNegotiationMutationRequest>({
    resolver: zodResolver(createDataNegotiationMutationRequestSchema),
  });

  async function handleCreateNewNegotiation(
    data: CreateDataNegotiationMutationRequest
  ) {
    await createNegotiation(
      { data },
      {
        onSuccess: () => {
          toast.success('Negociação criada com sucesso!');
          queryClient.invalidateQueries({ queryKey: getNegotiationQueryKey() });
          setOpen(false);
        },
        onError: err => {
          toast.error('Erro ao criar a negociação!');
          console.error(err.data.message);
        },
      }
    );
  }

  useEffect(() => {
    console.log('FORM ERRORS:', errors);
  }, [errors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex gap-2 items-center cursor-pointer"
          variant="default"
        >
          <CirclePlus size={16} />
          Nova Negociação
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova negociação</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateNewNegotiation)}
          className="space-y-3 mt-4"
        >
          <Input placeholder="Título" {...register('title')} />
          {errors.title && (
            <p className="text-red-700">{errors.title.message}</p>
          )}

          <Input placeholder="Cliente" {...register('client')} />
          {errors.client && (
            <p className="text-red-700">{errors.client.message}</p>
          )}

          <Input placeholder="Usuário" {...register('user')} />
          {errors.user && <p className="text-red-700">{errors.user.message}</p>}

          <Input placeholder="Tags" {...register('tags')} />
          {errors.tags && <p className="text-red-700">{errors.tags.message}</p>}

          <Input placeholder="Etapa" {...register('step')} />
          {errors.step && <p className="text-red-700">{errors.step.message}</p>}

          <Input placeholder="Status" {...register('status')} />
          {errors.status && (
            <p className="text-red-700">{errors.status.message}</p>
          )}

          <Input
            placeholder="Valor"
            {...register('value', { setValueAs: value => Number(value) })}
          />
          {errors.value && (
            <p className="text-red-700">{errors.value.message}</p>
          )}

          <Input placeholder="Parceiro" {...register('partnerId')} />
          {errors.partnerId && (
            <p className="text-red-700">{errors.partnerId.message}</p>
          )}

          <Input placeholder="Data de início" {...register('startsDate')} />
          {errors.startsDate && (
            <p className="text-red-700">{errors.startsDate.message}</p>
          )}

          <Input placeholder="Observação" {...register('observation')} />
          {errors.observation && (
            <p className="text-red-700">{errors.observation.message}</p>
          )}

          <Input
            placeholder="Guia média"
            {...register('averageGuide', {
              setValueAs: value => Number(value),
            })}
          />
          {errors.averageGuide && (
            <p className="text-red-700">{errors.averageGuide.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar negociação'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              reset({
                title: '',
                client: '',
                user: '',
                tags: '',
                step: '',
                status: '',
                value: 0,
                partnerId: '',
                startsDate: '',
                observation: '',
                averageGuide: 0,
              })
            }
          >
            Limpar campos
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
