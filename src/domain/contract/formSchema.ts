import { z } from 'zod';

export const contractSchema = z.object({
  city: z.string().nullable(),
  client: z.string().nullable(),
  state: z.string().nullable(),
  cnpj: z.string().nullable(),
  sindic: z.string().nullable(),
  year: z.string().nullable(),
  matter: z.string().nullable(),
  forecast: z.string().nullable(),
  contractTotal: z.string().nullable(),
  percentage: z.number().nullable(),
  signedContract: z.string().nullable(),
  status: z.string().nullable(),
  averageGuide: z.number().nullable(),
  partner: z.string().nullable(),
  partnerCommission: z.number().nullable(),
  counter: z.string().nullable(),
  email: z.string().nullable(),
});

export type ContractFormValues = z.infer<typeof contractSchema>;
