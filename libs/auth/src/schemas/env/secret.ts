import { z } from "zod";

import { AuthSecretSchema } from "@/schemas/secret";

export const AuthSecretEnvSchema = z.object({
  AUTH_SECRET: AuthSecretSchema,
});
export type AuthSecretEnv = z.infer<typeof AuthSecretEnvSchema>;
