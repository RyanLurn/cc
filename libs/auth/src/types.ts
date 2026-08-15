import type { ValueOf } from "@repo/types/object";

import type { createAuthServer } from "@/create-server";
import type { createTanstackStartAuthServer } from "@/create-server/tanstack-start";

export type AuthServer = ReturnType<typeof createAuthServer>;
export type TanstackStartAuthServer = ReturnType<
  typeof createTanstackStartAuthServer
>;

export type AuthErrorCode = ValueOf<AuthServer["$ERROR_CODES"]>["code"];
export type AuthSession = AuthServer["$Infer"]["Session"]["session"];
export type AuthUser = AuthServer["$Infer"]["Session"]["user"];
