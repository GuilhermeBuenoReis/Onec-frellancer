import { z } from 'zod';

export const negotiationSchema = z.object({
  id: z.string().optional(),
  title: z.string().nullable(),
  client: z.string().nullable(),
  user: z.string().nullable(),
  tags: z.string().nullable(),
  step: z.string().nullable(),
  status: z.enum(['Ganho', 'Em Andamento', 'Perdido'], {
    errorMap: () => ({ message: 'Status inválido' }),
  }),
  value: z.number().nullable(),
  startsDate: z.string().nullable(),
  observation: z.string().nullable(),
  averageGuide: z.number().nullable(),
  partnerId: z.string().nullable(),
});

export type NegotiationFormValues = z.infer<typeof negotiationSchema>;
