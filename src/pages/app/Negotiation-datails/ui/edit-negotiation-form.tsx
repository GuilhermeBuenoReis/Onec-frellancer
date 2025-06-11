import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  negotiationSchema,
  type NegotiationFormValues,
} from '@/domain/negotiation/form-schema';

export function EditNegotiationForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: NegotiationFormValues;
  onSubmit: (data: NegotiationFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NegotiationFormValues>({
    resolver: zodResolver(negotiationSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium">Título</label>
        <Input {...register('title')} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Cliente</label>
        <Input {...register('client')} />
        {errors.client && (
          <p className="text-red-500 text-sm">{errors.client.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Usuário</label>
        <Input {...register('user')} />
        {errors.user && (
          <p className="text-red-500 text-sm">{errors.user.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Tags</label>
        <Input {...register('tags')} />
        {errors.tags && (
          <p className="text-red-500 text-sm">{errors.tags.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Etapa</label>
        <Input {...register('step')} />
        {errors.step && (
          <p className="text-red-500 text-sm">{errors.step.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          {...register('status')}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Selecione um status</option>
          <option value="Ganho">Ganho</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Perdido">Perdido</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Valor</label>
        <Input
          type="number"
          step="0.01"
          {...register('value', { valueAsNumber: true })}
        />
        {errors.value && (
          <p className="text-red-500 text-sm">{errors.value.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Data Início</label>
        <Input type="date" {...register('startsDate')} />
        {errors.startsDate && (
          <p className="text-red-500 text-sm">{errors.startsDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Observação</label>
        <textarea
          {...register('observation')}
          className="w-full border rounded px-2 py-1"
          rows={3}
        />
        {errors.observation && (
          <p className="text-red-500 text-sm">{errors.observation.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Guia Média</label>
        <Input
          type="number"
          step="0.01"
          {...register('averageGuide', { valueAsNumber: true })}
        />
        {errors.averageGuide && (
          <p className="text-red-500 text-sm">{errors.averageGuide.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Parceiro</label>
        <Input {...register('partnerId')} />
        {errors.partnerId && (
          <p className="text-red-500 text-sm">{errors.partnerId.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset(defaultValues)}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}
