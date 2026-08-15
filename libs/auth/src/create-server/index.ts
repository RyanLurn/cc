import { betterAuth } from "better-auth/minimal";

import type { CreateAuthServerParams } from "@/create-server/options";

import { createAuthServerOptions } from "@/create-server/options";

export function createAuthServer({
  db,
  baseURL,
  basePath,
  secret,
}: CreateAuthServerParams) {
  return betterAuth(
    createAuthServerOptions({
      db,
      baseURL,
      basePath,
      secret,
    }),
  );
}
