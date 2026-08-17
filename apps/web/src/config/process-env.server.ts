import type { Result } from "@repo/result/types";

import { AuthSecretEnvSchema } from "@repo/auth/schemas/env/secret";
import { DbEnvSchema } from "@repo/db/env";
import { InvalidEnvError } from "@repo/env/error";
import { err, ok } from "@repo/result/utils";
import { createServerOnlyFn } from "@tanstack/react-start";
import { z } from "zod";

import { DEFAULT_ERROR_MESSAGE } from "@/error/constants";

export const ProcessEnvSchema = z.object({
  ...DbEnvSchema.shape,
  ...AuthSecretEnvSchema.shape,
});
export type ProcessEnv = z.infer<typeof ProcessEnvSchema>;

export const getProcessEnv = createServerOnlyFn(
  (): Result<ProcessEnv, InvalidEnvError> => {
    const parseEnvResult = ProcessEnvSchema.safeParse(process.env);

    if (!parseEnvResult.success) {
      return err(
        new InvalidEnvError({
          message: DEFAULT_ERROR_MESSAGE,
          cause: parseEnvResult.error,
        }),
      );
    }

    return ok(parseEnvResult.data);
  },
);
