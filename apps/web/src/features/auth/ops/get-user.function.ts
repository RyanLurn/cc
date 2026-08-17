import { getAuthUser } from "@repo/auth/ops/get-user";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { getAuthServer } from "@/features/auth/ops/get-server.server";

export const getUser = createServerFn().handler(async () => {
  const { headers, url } = getRequest();
  const authServer = getAuthServer();

  const getAuthUserResult = await getAuthUser({
    authServer,
    headers,
  });

  if (getAuthUserResult.ok) {
    return getAuthUserResult.data;
  }

  const error = getAuthUserResult.error;
  if (error.code === "UNAUTHENTICATED_ERROR") {
    throw redirect({
      to: "/sign-in",
      search: { redirect: new URL(url).pathname },
    });
  }
  throw redirect({ to: "/500" });
});
