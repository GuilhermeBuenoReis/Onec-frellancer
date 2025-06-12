import { z } from 'zod';

export const partnerSchema = z.object({
  name: z.string().nullable(),
  cpfOrCnpj: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  commission: z.number().nullable(),
  portal: z.string().nullable(),
  channelHead: z.string().nullable(),
  regional: z.string().nullable(),
  coordinator: z.string().nullable(),
  agent: z.string().nullable(),
  indicator: z.string().nullable(),
  contract: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  responsible: z.string().nullable(),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;
