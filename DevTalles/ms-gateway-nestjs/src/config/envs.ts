import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535),
  PRODUCTS_MICROSERVICE_HOST: z.string().nonempty(),
  PRODUCTS_MICROSERVICE_PORT: z.coerce.number().min(1).max(65535),
}).loose();

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  throw new Error(`Invalid environment variables: ${JSON.stringify(error.issues)}`);
}

export const envs = {
  PORT: data.PORT,
  PRODUCTS_MICROSERVICE_HOST: data.PRODUCTS_MICROSERVICE_HOST,
  PRODUCTS_MICROSERVICE_PORT: data.PRODUCTS_MICROSERVICE_PORT,
};
