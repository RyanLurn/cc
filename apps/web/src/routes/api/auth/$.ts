import { createFileRoute } from "@tanstack/react-router";

import { getAuthServer } from "@/features/auth/ops/get-server.server";

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
