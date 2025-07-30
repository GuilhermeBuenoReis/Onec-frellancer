'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  type CreatePendingMutationRequest,
  createPendingMutationRequestSchema,
  getPendingsQueryKey,
  useCreatePending,
} from '@/generated';
import { queryClient } from '@/lib/query-client';

const statusEnum = z.enum(['Aberto', 'Encaminhado', 'Pendente', 'Concluído']);
const categoryEnum = z.enum([
  'SAC',
  'Atendimento',
  'Financeiro',
  'Diretoria',
  'Comercial',
  'Auditoria',
]);

const statusOptions = statusEnum.options;
const categoryOptions = categoryEnum.options;

export function PendingCreateDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createPending, isPending } = useCreatePending();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatePendingMutationRequest>({
    resolver: zodResolver(createPendingMutationRequestSchema),
  });

  async function handleCreate(data: CreatePendingMutationRequest) {
    await createPending(
      { data },
      {
        onSuccess: () => {
          toast.success('Chamado criado com sucesso!');
          queryClient.invalidateQueries({ queryKey: getPendingsQueryKey() });
          setOpen(false);
          reset();
        },
        onError: err => {
          toast.error('Erro ao criar o chamado!');
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
          Novo chamado
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Criar novo chamado
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4 mt-4">
          <ScrollArea className="max-h-[500px]">
            <div className="space-y-4">
              <Input {...register('client')} placeholder="Cliente" />
              {errors.client && (
                <p className="text-sm text-red-500">{errors.client.message}</p>
              )}

              <Input {...register('callReason')} placeholder="Motivo" />
              {errors.callReason && (
                <p className="text-sm text-red-500">
                  {errors.callReason.message}
                </p>
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

              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Prioridade (Alta, Média, Baixa)"
                  />
                )}
              />
              {errors.priority && (
                <p className="text-sm text-red-500">
                  {errors.priority.message}
                </p>
              )}

              <Input {...register('responsible')} placeholder="Responsável" />
              {errors.responsible && (
                <p className="text-sm text-red-500">
                  {errors.responsible.message}
                </p>
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
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Criando...' : 'Criar chamado'}
              </Button>
            </div>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
}
