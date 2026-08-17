import { z } from "zod";

import { AUTH_BASE_URL_ENV_KEY } from "@/constants";
import { AuthBaseUrlSchema } from "@/schemas/base-url";
import { AuthSecretEnvSchema } from "@/schemas/env/secret";

export const AuthEnvSchema = z.object({
  ...AuthSecretEnvSchema.shape,
  [AUTH_BASE_URL_ENV_KEY]: AuthBaseUrlSchema,
});
export type AuthEnv = z.infer<typeof AuthEnvSchema>;
