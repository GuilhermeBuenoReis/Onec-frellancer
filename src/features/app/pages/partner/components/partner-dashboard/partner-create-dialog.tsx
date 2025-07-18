'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../../components/ui/dialog';
import { Input } from '../../../../../../components/ui/input';

const partnerSchema = z.object({
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

type PartnerFormData = z.infer<typeof partnerSchema>;

export function PartnerCreateDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
  });

  const onSubmit = (data: PartnerFormData) => {
    setLoading(true);
    setTimeout(() => {
      console.log('🟢 Novo parceiro criado:', data);
      setLoading(false);
      reset();
      setOpen(false);
    }, 1000);
  };

  const fields: { name: keyof PartnerFormData; label: string }[] = [
    { name: 'month', label: 'Mês (1 a 12)' },
    { name: 'monthOfCalculation', label: 'Mês de Cálculo' },
    { name: 'competenceMonth', label: 'Mês de Competência' },
    { name: 'contract', label: 'Contrato' },
    { name: 'enterprise', label: 'Empresa' },
    { name: 'product', label: 'Produto' },
    { name: 'percentageHonorary', label: '% Honorário (number)' },
    { name: 'compensation', label: 'Compensação (number)' },
    { name: 'honorary', label: 'Honorário (number)' },
    { name: 'tax', label: 'Imposto (number)' },
    { name: 'tj', label: 'TJ (number)' },
    { name: 'value', label: 'Valor (number)' },
    { name: 'situation', label: 'Situação' },
    { name: 'partnerId', label: 'ID do parceiro' },
    { name: 'fee', label: 'Fee (string)' },
    { name: 'feePercentage', label: 'Fee % (string)' },
    { name: 'courtFee', label: 'Court Fee (string)' },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex gap-2 items-center">
          <PlusCircle className="w-4 h-4" />
          Novo parceiro
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastro de novo parceiro</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-h-[75vh] overflow-y-auto pr-2"
        >
          {fields.map(({ name, label }) => (
            <div key={name} className="flex flex-col gap-1">
              <label htmlFor={name} className="text-sm font-medium">
                {label}
              </label>
              <Input
                id={name}
                {...register(name)}
                placeholder={label}
                className={errors[name] ? 'border-red-500' : ''}
              />
              {errors[name] && (
                <p className="text-sm text-red-500">
                  {String(errors[name]?.message)}
                </p>
              )}
            </div>
          ))}

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-muted-foreground text-sm"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Criando parceiro...
              </motion.div>
            ) : (
              <motion.div
                key="submit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Button type="submit" className="w-full">
                  Confirmar
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </DialogContent>
    </Dialog>
  );
}
