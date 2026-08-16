import { z } from "zod";

import {
  AUTH_BASE_PATH_ENV_KEY,
  AUTH_BASE_URL_ENV_KEY,
  DEFAULT_AUTH_BASE_PATH,
} from "@/constants";
import { AuthBasePathSchema } from "@/schemas/base-path";
import { AuthBaseUrlSchema } from "@/schemas/base-url";
import { AuthSecretEnvSchema } from "@/schemas/env/secret";

export const AuthEnvSchema = z.object({
  ...AuthSecretEnvSchema.shape,
  [AUTH_BASE_URL_ENV_KEY]: AuthBaseUrlSchema,
  [AUTH_BASE_PATH_ENV_KEY]: AuthBasePathSchema.default(DEFAULT_AUTH_BASE_PATH),
});
export type AuthEnv = z.infer<typeof AuthEnvSchema>;
