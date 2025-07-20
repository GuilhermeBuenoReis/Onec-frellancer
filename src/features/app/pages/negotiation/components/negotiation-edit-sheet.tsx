'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../../../../../components/ui/sheet';
import {
  type NegotiationFormData,
  negotiationSchema,
} from '../schemas/negotiation-schema';

interface NegotiationEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: NegotiationFormData;
  onSave: (values: NegotiationFormData) => void;
}

const fieldLabels: Record<keyof NegotiationFormData, string> = {
  client: 'Cliente',
  cnpj: 'CNPJ',
  city: 'Cidade',
  state: 'Estado',
  date: 'Data',
  status: 'Status',
  subject: 'Matéria',
  forecast: 'Previsão',
  contractTotal: 'Total do Contrato',
  percentage: 'Porcentagem',
  averageGuide: 'Guia Média',
  partner: 'Parceiro',
  commission: 'Comissão',
  contract: 'Contrato',
  contact: 'Contato',
  email: 'E-mail',
  title: 'Título',
  user: 'Usuário',
  tags: 'Tags',
  stage: 'Etapa',
  amount: 'Valor',
  note: 'Observação',
};

export function NegotiationEditSheet({
  open,
  onOpenChange,
  data,
  onSave,
}: NegotiationEditSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NegotiationFormData>({
    resolver: zodResolver(negotiationSchema),
    defaultValues: data,
  });

  useEffect(() => {
    if (open) reset(data);
  }, [open, data, reset]);

  function handleSave(values: NegotiationFormData) {
    onSave(values);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto max-h-screen p-4">
        <SheetHeader>
          <SheetTitle className="text-xl">Editar parceiro</SheetTitle>
          <SheetDescription>Edite os dados do recebimento</SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleSave)}
          className="space-y-4 mt-6 pb-8"
        >
          {Object.keys(data).map(key => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                {fieldLabels[key as keyof NegotiationFormData] ?? key}
              </label>
              <Input {...register(key as keyof NegotiationFormData)} />
              {errors[key as keyof NegotiationFormData] && (
                <p className="text-sm text-red-500">
                  {String(errors[key as keyof NegotiationFormData]?.message)}
                </p>
              )}
            </div>
          ))}

          <Button type="submit" className="w-full mt-4">
            Salvar alterações
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
