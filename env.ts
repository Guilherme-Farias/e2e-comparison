import z from 'zod';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV) {
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  });
} else {
  throw new Error('Must have NODE_ENV variable');
}

const envSchema = z.object({
  BASE_URL: z.string().url(),
  TASK_URL: z.string().url(),
  CASH_URL: z.string().url(),
  ADMIN_NAME: z.string(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(6).max(30),
  COLABORADOR_NAME: z.string(),
  COLABORADOR_EMAIL: z.string().email(),
  COLABORADOR_PASSWORD: z.string().min(6).max(30),
  GERENTE_NAME: z.string(),
  GERENTE_EMAIL: z.string().email(),
  GERENTE_PASSWORD: z.string().min(6).max(30),
  ASSISTENTE_ADMINISTRATIVO_NAME: z.string(),
  ASSISTENTE_ADMINISTRATIVO_EMAIL: z.string().email(),
  ASSISTENTE_ADMINISTRATIVO_PASSWORD: z.string().min(6).max(30),
  COMERCIAL_NAME: z.string(),
  COMERCIAL_EMAIL: z.string().email(),
  COMERCIAL_PASSWORD: z.string().min(6).max(30),
  NODE_ENV: z.enum(['test', 'test.local']),
});

export const ENV = envSchema.parse(process.env);
