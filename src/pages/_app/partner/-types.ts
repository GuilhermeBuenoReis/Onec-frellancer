import { z } from 'zod';

export const dashboardParamsSchema = z.object({
  id: z.string().optional(),
  info: z
    .enum(['value', 'honorary', 'compensation', 'tax', 'percentageHonorary'])
    .optional(),
  totals: z.enum(['on', 'off']).optional(),
  month: z.string().optional(),
  contract: z.string().optional(),
  enterprise: z.string().optional(),
  product: z.string().optional(),
  date: z.string().optional(),
});

export type DashboardParams = z.infer<typeof dashboardParamsSchema>;
