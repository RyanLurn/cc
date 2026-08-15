import type { Auth } from "better-auth";

import type { createAuthServerOptions } from "@/create-server-options";

export type AuthServerOptions = ReturnType<typeof createAuthServerOptions>;
export type AuthServer = Auth<AuthServerOptions>;

export type AuthSession = AuthServer["$Infer"]["Session"]["session"];
export type AuthUser = AuthServer["$Infer"]["Session"]["user"];
