import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCreatePartnerForm } from '@/hooks/useCreatePartnerForm';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';
import type { RegisterOptions } from 'react-hook-form';

interface FieldConfig {
  field: keyof PartnerFormValues;
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  registerOptions?: RegisterOptions<PartnerFormValues>;
}

export function CreatePartnerForm() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    isSubmitting,
  } = useCreatePartnerForm();

  const fields: FieldConfig[] = [
    { field: 'name', label: 'Nome' },
    { field: 'cpfOrCnpj', label: 'CPF/CNPJ' },
    { field: 'city', label: 'Cidade' },
    { field: 'state', label: 'Estado' },
    {
      field: 'commission',
      label: 'Comissão',
      inputProps: { type: 'number', step: '0.01' },
      registerOptions: { valueAsNumber: true },
    },
    { field: 'portal', label: 'Portal' },
    { field: 'channelHead', label: 'Head de Canal' },
    { field: 'regional', label: 'Regional' },
    { field: 'coordinator', label: 'Coordenador' },
    { field: 'agent', label: 'Agente' },
    { field: 'indicator', label: 'Indicador' },
    { field: 'contract', label: 'Contrato' },
    { field: 'phone', label: 'Telefone', inputProps: { type: 'tel' } },
    { field: 'email', label: 'E-mail', inputProps: { type: 'email' } },
    { field: 'responsible', label: 'Responsável' },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {fields.map(({ field, label, inputProps, registerOptions }) => (
        <div key={field} className="flex flex-col">
          <Label htmlFor={field}>{label}</Label>
          <Input
            id={field}
            {...register(field, registerOptions)}
            {...inputProps}
            className="mt-1"
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[field]?.message}
            </p>
          )}
        </div>
      ))}

      <div className="sm:col-span-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Criando...' : 'Criar Parceiro'}
        </Button>
      </div>
    </form>
  );
}
