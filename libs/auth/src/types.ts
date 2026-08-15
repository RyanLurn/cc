import type { betterAuth } from "better-auth/minimal";

import type { createAuthServerOptions } from "@/create-server-options";

export type AuthServerOptions = ReturnType<typeof createAuthServerOptions>;
export type AuthServer = ReturnType<typeof betterAuth<AuthServerOptions>>;

export type AuthSession = AuthServer["$Infer"]["Session"]["session"];
export type AuthUser = AuthServer["$Infer"]["Session"]["user"];
