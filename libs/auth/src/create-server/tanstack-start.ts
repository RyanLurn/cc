import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import type { CreateAuthServerParams } from "@/create-server/options";

import { createAuthServerOptions } from "@/create-server/options";

export function createTanstackStartAuthServer({
  db,
  baseURL,
  basePath,
  secret,
}: CreateAuthServerParams) {
  return betterAuth({
    ...createAuthServerOptions({
      db,
      baseURL,
      basePath,
      secret,
    }),
    // Make sure to keep the tanstackStartCookies plugin at the end of the array.
    plugins: [tanstackStartCookies()],
  });
}
