import { z } from 'zod';

export const dashboardParamsSchema = z.object({
  info: z
    .enum(['value', 'fee', 'compensation', 'tax', 'courtFee', 'feePercentage'])
    .optional()
    .default('value'),

  totals: z.union([z.literal('on'), z.undefined()]).optional(),
});
