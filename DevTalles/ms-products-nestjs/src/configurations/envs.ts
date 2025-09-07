import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535),
  DATABASE_URL: z.url(),
}).loose();

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  throw new Error(`Invalid environment variables: ${JSON.stringify(error.issues)}`);
}

export const envs = {
  PORT: data.PORT,
  DATABASE_URL: data.DATABASE_URL,
};
