import { createTanstackStartAuthServer } from "@repo/auth/create-server/tanstack-start";
import { createDb } from "@repo/db/create";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { getProcessEnv } from "@/config/process-env.server";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authServer = getAuthServer();
        return await authServer.handler(request);
      },
      POST: async ({ request }) => {
        const authServer = getAuthServer();
        return await authServer.handler(request);
      },
    },
  },
});

function getAuthServer() {
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
}
