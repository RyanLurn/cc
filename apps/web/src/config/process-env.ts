import { AuthSecretEnvSchema } from "@repo/auth/schemas/env/secret";
import { DbEnvSchema } from "@repo/db/env";
import { z } from "zod";

export const ProcessEnvSchema = z.object({
  ...DbEnvSchema.shape,
  ...AuthSecretEnvSchema.shape,
});
