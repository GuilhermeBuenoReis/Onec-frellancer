import { z } from 'zod';
import {
  CreatePendingBodyStatus,
  CreatePendingBodyCategory,
} from '@/http/models';

export const pendingSchema = z.object({
  client: z.string().min(1, 'Cliente é obrigatório'),
  callReason: z.string().min(1, 'Motivo é obrigatório'),
  priority: z.string().min(1, 'Prioridade é obrigatória'),
  responsible: z.string().min(1, 'Responsável é obrigatório'),
  category: z.nativeEnum(CreatePendingBodyCategory, {
    errorMap: () => ({ message: 'Categoria inválida' }),
  }),
  description: z.string().min(1, 'Descrição é obrigatória'),
  status: z.nativeEnum(CreatePendingBodyStatus, {
    errorMap: () => ({ message: 'Status inválido' }),
  }),
});

export type PendingFormValues = z.infer<typeof pendingSchema>;
