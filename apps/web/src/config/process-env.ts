import type { Result } from "@repo/result/types";

import { AuthSecretEnvSchema } from "@repo/auth/schemas/env/secret";
import { DbEnvSchema } from "@repo/db/env";
import { InvalidEnvError } from "@repo/env/error";
import { err, ok } from "@repo/result/utils";
import { z } from "zod";

export const ProcessEnvSchema = z.object({
  ...DbEnvSchema.shape,
  ...AuthSecretEnvSchema.shape,
});
export type ProcessEnv = z.infer<typeof ProcessEnvSchema>;

export function getProcessEnv(): Result<ProcessEnv, InvalidEnvError> {
  const parseEnvResult = ProcessEnvSchema.safeParse(process.env);

  if (!parseEnvResult.success) {
    return err(
      new InvalidEnvError({
        message:
          "Something went wrong. Please try again later or contact support.",
        cause: parseEnvResult.error,
      }),
    );
  }

  return ok(parseEnvResult.data);
}
