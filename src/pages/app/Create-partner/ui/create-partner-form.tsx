import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCreatePartnerForm } from '@/hooks/useCreatePartnerForm';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';

export function CreatePartnerForm() {
  const {
    form: {
      register,
      formState: { errors },
      handleSubmit,
    },
    onSubmit,
    isSubmitting,
  } = useCreatePartnerForm();

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {fields.map(field => (
        <div key={field} className="flex flex-col">
          <Label htmlFor={field}>{field}</Label>
          <Input
            id={field}
            {...register(
              field,
              field === 'commission' ? { valueAsNumber: true } : {}
            )}
            className="mt-1"
            {...(field === 'phone'
              ? { type: 'tel', placeholder: '(XX) XXXXX-XXXX' }
              : field === 'email'
                ? { type: 'email', placeholder: 'email@exemplo.com' }
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

      <div className="sm:col-span-2 flex justify-end mt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Criando...' : 'Criar Parceiro'}
        </Button>
      </div>
    </form>
  );
}
