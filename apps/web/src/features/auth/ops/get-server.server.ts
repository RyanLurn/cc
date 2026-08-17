import { createTanstackStartAuthServer } from "@repo/auth/create-server/tanstack-start";
import { createDb } from "@repo/db/create";
import { redirect } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";

import { getProcessEnv } from "@/config/process-env.server";

export const getAuthServer = createServerOnlyFn(() => {
  const getProcessEnvResult = getProcessEnv();
  if (!getProcessEnvResult.ok) {
    throw redirect({ to: "/500" });
  }
  const processEnv = getProcessEnvResult.data;

  return createTanstackStartAuthServer({
    db: createDb(processEnv.NEON_POOLED_CONNECTION_STRING),
    baseURL: import.meta.env.VITE_AUTH_BASE_URL,
    secret: processEnv.AUTH_SECRET,
  });
});
