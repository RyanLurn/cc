import { HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD } from "@repo/http/response-statuses/error/server";
import { createFileRoute } from "@tanstack/react-router";

import { getAuthServer } from "@/features/auth/ops/get-server.server";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        const getAuthServerResult = getAuthServer();
        if (!getAuthServerResult.ok) {
          const httpError =
            HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD.INTERNAL_SERVER_ERROR;
          return Response.json(getAuthServerResult.error.shallowSerialize(), {
            status: httpError.code,
            statusText: httpError.text,
          });
        }
        return await getAuthServerResult.data.handler(request);
      },
    },
  },
});
