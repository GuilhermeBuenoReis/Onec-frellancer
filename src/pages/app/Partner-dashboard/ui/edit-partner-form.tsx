import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  partnerSchema,
  type PartnerFormValues,
} from '@/domain/Partner/form-schema';

export function EditPartnerForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: PartnerFormValues;
  onSubmit: (data: PartnerFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const fields: (keyof PartnerFormValues)[] = [
    'name',
    'cpfOrCnpj',
    'city',
    'state',
    'commission',
    'portal',
    'channelHead',
    'regional',
    'coordinator',
    'agent',
    'indicator',
    'contract',
    'phone',
    'email',
    'responsible',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      {fields.map(field => (
        <div key={field} className="flex flex-col">
          <Label htmlFor={field}>{field}</Label>
          <Input
            id={field}
            {...register(
              field,
              field === 'commission' ? { valueAsNumber: true } : {}
            )}
            placeholder={field}
            className="mt-1"
            {...(field === 'phone'
              ? { type: 'tel' }
              : field === 'email'
                ? { type: 'email' }
                : field === 'commission'
                  ? { type: 'number', step: '0.01' }
                  : {})}
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[field]?.message}
            </p>
          )}
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={() => reset(defaultValues)}
          disabled={isSubmitting}
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
