import { z } from 'zod';

export const negotiationSchema = z.object({
  id: z.string().optional(),
  client: z.string(),
  cnpj: z.string(),
  city: z.string(),
  state: z.string(),
  date: z.string(),
  status: z.string(),
  subject: z.string(),
  forecast: z.string(),
  contractTotal: z.number(),
  percentage: z.number(),
  averageGuide: z.number(),
  partner: z.string(),
  commission: z.number(),
  contract: z.string(),
  contact: z.string(),
  email: z.string().email(),
  title: z.string(),
  user: z.string(),
  tags: z.array(z.string()),
  stage: z.string(),
  amount: z.number(),
  note: z.string(),
});

export type NegotiationFormData = z.infer<typeof negotiationSchema>;
