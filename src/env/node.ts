import z from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_API_URL_DEVELOPMENT: z.string(),
});

export const env = envSchema.parse({
  VITE_API_URL: process.env.VITE_API_URL ?? '',
  VITE_API_URL_DEVELOPMENT: process.env.VITE_API_URL_DEVELOPMENT ?? '',
});
