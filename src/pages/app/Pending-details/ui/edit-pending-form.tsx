import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  pendingSchema,
  type PendingFormValues,
} from '@/domain/pending/form-schema';

export function EditPendingForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: PendingFormValues;
  onSubmit: (data: PendingFormValues) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PendingFormValues>({
    resolver: zodResolver(pendingSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const fields = Object.keys(defaultValues) as Array<keyof PendingFormValues>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map(field => {
        const label = {
          client: 'Cliente',
          callReason: 'Motivo do Chamado',
          priority: 'Prioridade',
          responsible: 'Responsável',
          category: 'Categoria',
          description: 'Descrição',
          status: 'Status',
        }[field];
        return (
          <div key={field} className="flex flex-col">
            <Label htmlFor={field}>{label}</Label>
            {field === 'description' ? (
              <Textarea id={field} {...register(field)} />
            ) : (
              <Input id={field} {...register(field)} />
            )}
            {errors[field] && (
              <p className="text-red-600 text-sm">{errors[field]?.message}</p>
            )}
          </div>
        );
      })}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando…' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}
