import { z } from 'zod/v4';

export const uploadSpreadsheetSchema = z.object({
  type: z.enum(['negotiation', 'client', 'partner'], {
    error: 'Selecione o tipo de planilha',
  }),
  file: z
    .instanceof(File, { message: 'Arquivo obrigatório' })
    .refine(file => file.size > 0, 'Arquivo obrigatório'),
});

export type UploadSpreadsheetSchema = z.infer<typeof uploadSpreadsheetSchema>;
