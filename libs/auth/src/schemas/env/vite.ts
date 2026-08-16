import { VITE_ENV_KEY_PREFIX } from "@repo/env/constants";
import { z } from "zod";

import { AUTH_BASE_PATH_ENV_KEY, AUTH_BASE_URL_ENV_KEY } from "@/constants";
import { AuthBasePathSchema } from "@/schemas/base-path";
import { AuthBaseUrlSchema } from "@/schemas/base-url";

export const AuthViteEnvSchema = z.object({
  [`${VITE_ENV_KEY_PREFIX}${AUTH_BASE_URL_ENV_KEY}`]: AuthBaseUrlSchema,
  [`${VITE_ENV_KEY_PREFIX}${AUTH_BASE_PATH_ENV_KEY}`]:
    AuthBasePathSchema.optional(),
});
export type AuthViteEnv = z.infer<typeof AuthViteEnvSchema>;
