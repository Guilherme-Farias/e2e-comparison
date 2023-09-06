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
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(6).max(30),
  NODE_ENV: z.enum(['test', 'test.local']),
});

export const ENV = envSchema.parse(process.env);
