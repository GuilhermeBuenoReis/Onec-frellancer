'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../../../../../components/ui/sheet';
import type { Call } from '../types/pending-call';

interface PendingEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Call;
  onSave: (values: Call) => void;
}

const callSchema = z.object({
  client: z.string().nonempty('Cliente é obrigatório'),
  callReason: z.string().nonempty('Motivo é obrigatório'),
  status: z.enum(['Aberto', 'Encaminhado', 'Pendente', 'Concluído']),
  priority: z.enum(['Alta', 'Média', 'Baixa']),
  responsible: z.string().nonempty('Responsável é obrigatório'),
  category: z.enum([
    'SAC',
    'Atendimento',
    'Financeiro',
    'Diretoria',
    'Comercial',
    'Auditoria',
  ]),
  description: z.string().nonempty('Descrição é obrigatória'),
});

export function PendingEditSheet({
  open,
  onOpenChange,
  data,
  onSave,
}: PendingEditSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Call>({
    resolver: zodResolver(callSchema),
    defaultValues: data,
  });

  useEffect(() => {
    if (open) reset(data);
  }, [open, data, reset]);

  function handleSave(values: Call) {
    onSave(values);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto max-h-screen p-4">
        <SheetHeader>
          <SheetTitle>Editar chamado</SheetTitle>
        </SheetHeader>

        <motion.form
          onSubmit={handleSubmit(handleSave)}
          className="space-y-4 mt-6 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-sm font-medium capitalize">{key}</label>
              <Input {...register(key as keyof Call)} defaultValue={value} />
              {errors[key as keyof Call] && (
                <p className="text-sm text-red-500">
                  {String(errors[key as keyof Call]?.message)}
                </p>
              )}
            </div>
          ))}

          <Button type="submit" className="w-full mt-4">
            Salvar alterações
          </Button>
        </motion.form>
      </SheetContent>
    </Sheet>
  );
}
