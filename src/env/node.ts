import z from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  VITE_API_URL: z.string(),
});

export const env = envSchema.parse({
  VITE_API_URL: process.env.VITE_API_URL ?? '',
});
