import type { TanstackStartAuthServer } from "@repo/auth/types";
import type { InvalidEnvError } from "@repo/env/error";
import type { Result } from "@repo/result/types";

import { createTanstackStartAuthServer } from "@repo/auth/create-server/tanstack-start";
import { createDb } from "@repo/db/create";
import { ok } from "@repo/result/utils";
import { createServerOnlyFn } from "@tanstack/react-start";

import { getProcessEnv } from "@/config/process-env.server";

export const getAuthServer = createServerOnlyFn(
  (): Result<TanstackStartAuthServer, InvalidEnvError> => {
    const getProcessEnvResult = getProcessEnv();
    if (!getProcessEnvResult.ok) {
      return getProcessEnvResult;
    }
    const processEnv = getProcessEnvResult.data;

    const authServer = createTanstackStartAuthServer({
      db: createDb(processEnv.NEON_POOLED_CONNECTION_STRING),
      baseURL: import.meta.env.VITE_AUTH_BASE_URL,
      secret: processEnv.AUTH_SECRET,
    });
    return ok(authServer);
  },
);
