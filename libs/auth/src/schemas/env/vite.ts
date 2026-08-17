import { VITE_ENV_KEY_PREFIX } from "@repo/env/constants";
import { z } from "zod";

import { AUTH_BASE_URL_ENV_KEY } from "@/constants";
import { AuthBaseUrlSchema } from "@/schemas/base-url";

export const AuthViteEnvSchema = z.object({
  [`${VITE_ENV_KEY_PREFIX}${AUTH_BASE_URL_ENV_KEY}`]: AuthBaseUrlSchema,
});
export type AuthViteEnv = z.infer<typeof AuthViteEnvSchema>;
