import { betterAuth } from "better-auth/minimal";

import type { AuthServerParams } from "@/create/server-options";

import { createAuthServerOptions } from "@/create/server-options";

export function createAuthServer({
  db,
  baseURL,
  basePath,
  secret,
}: AuthServerParams) {
  return betterAuth(
    createAuthServerOptions({
      db,
      baseURL,
      basePath,
      secret,
    }),
  );
}
