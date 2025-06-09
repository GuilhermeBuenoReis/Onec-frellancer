import { z } from 'zod';

export const credentialSchema = z.object({
  id: z.string(),
  channelHead: z.string().nullable(),
  partner: z.string().nullable(),
  cnpj: z.string().nullable(),
  agentIndicator: z.string().nullable(),
});

export const clientSchema = z.object({
  id: z.string(),
  enterprise: z.string().nullable(),
  competenceMonth: z.string().nullable(),
  cnpj: z.string().nullable(),
  product: z.string().nullable(),
  contestation: z.string().nullable(),
  returned: z.string().nullable(),
});

export const contestationSchema = z.object({
  id: z.string(),
  credential: credentialSchema,
  client: clientSchema,
});

export type ContestationForm = z.infer<typeof contestationSchema>;
