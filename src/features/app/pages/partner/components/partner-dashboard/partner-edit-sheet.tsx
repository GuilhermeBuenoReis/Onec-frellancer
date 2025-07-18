'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../../../../components/ui/button';
import { Input } from '../../../../../../components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../../../../../../components/ui/sheet';
import type { PartnerFormData } from '../../types/partner-type-data';

interface PartnerEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: PartnerFormData;
  onSave: (values: PartnerFormData) => void;
}

const schema = z.object({
  month: z.int().min(1).max(12),
  monthOfCalculation: z.string().min(1),
  competenceMonth: z.string().min(1),
  contract: z.int().nonnegative(),
  enterprise: z.string().min(1),
  product: z.string().min(1),
  percentageHonorary: z.int().nonnegative(),
  compensation: z.int().nonnegative(),
  honorary: z.int().nonnegative(),
  tax: z.int().nonnegative(),
  tj: z.int().nonnegative(),
  value: z.int().nonnegative(),
  situation: z.string().min(1),
  partnerId: z.string().min(1),
  fee: z.string().min(1),
  feePercentage: z.string().min(1),
  courtFee: z.string().min(1),
});

const fieldLabels: Record<keyof PartnerFormData, string> = {
  month: 'Mês',
  monthOfCalculation: 'Mês de Cálculo',
  competenceMonth: 'Competência',
  contract: 'Contrato',
  enterprise: 'Empresa',
  product: 'Produto',
  percentageHonorary: '% Honorário',
  compensation: 'Compensação',
  honorary: 'Honorário',
  tax: 'Imposto',
  tj: 'TJ',
  value: 'Valor',
  situation: 'Situação',
  partnerId: 'ID do Parceiro',
  fee: 'Fee',
  feePercentage: '% Fee',
  courtFee: 'Taxa Judicial',
};

export function PartnerEditSheet({
  open,
  onOpenChange,
  data,
  onSave,
}: PartnerEditSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  useEffect(() => {
    if (open) reset(data);
  }, [open, data, reset]);

  function handleSave(values: PartnerFormData) {
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
                {fieldLabels[key as keyof PartnerFormData] ?? key}
              </label>
              <Input {...register(key as keyof PartnerFormData)} />
              {errors[key as keyof PartnerFormData] && (
                <p className="text-sm text-red-500">
                  {String(errors[key as keyof PartnerFormData]?.message)}
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
