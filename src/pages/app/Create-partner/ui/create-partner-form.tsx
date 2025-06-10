import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCreatePartnerForm } from '@/hooks/useCreatePartnerForm';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';
import type { RegisterOptions } from 'react-hook-form';

interface FieldConfig {
  name: keyof PartnerFormValues;
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  registerOptions?: RegisterOptions<PartnerFormValues>;
}

export function CreatePartnerForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
    isSubmitting,
  } = useCreatePartnerForm();

  const fields: FieldConfig[] = [
    { name: 'name', label: 'Nome' },
    { name: 'cpfOrCnpj', label: 'CPF/CNPJ' },
    { name: 'city', label: 'Cidade' },
    { name: 'state', label: 'Estado' },
    {
      name: 'commission',
      label: 'Comissão',
      inputProps: { type: 'number', step: '0.01', placeholder: '0.00' },
      registerOptions: { valueAsNumber: true },
    },
    { name: 'portal', label: 'Portal' },
    { name: 'channelHead', label: 'Líder de Canal' },
    { name: 'regional', label: 'Regional' },
    { name: 'coordinator', label: 'Coordenador' },
    { name: 'agent', label: 'Agente' },
    { name: 'indicator', label: 'Indicador' },
    { name: 'contract', label: 'Contrato' },
    {
      name: 'phone',
      label: 'Telefone',
      inputProps: { type: 'tel', placeholder: '(XX) XXXXX-XXXX' },
    },
    {
      name: 'email',
      label: 'E-mail',
      inputProps: { type: 'email', placeholder: 'email@exemplo.com' },
    },
    { name: 'responsible', label: 'Responsável' },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {fields.map(({ name, label, inputProps, registerOptions }) => (
        <div key={name} className="flex flex-col">
          <Label htmlFor={name} className="font-medium text-gray-700">
            {label}
          </Label>

          <Input
            id={name}
            {...register(name, registerOptions)}
            {...inputProps}
            className="mt-2"
            placeholder={inputProps?.placeholder ?? label}
          />

          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
          )}
        </div>
      ))}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Parceiro'}
        </Button>
      </div>
    </form>
  );
}
