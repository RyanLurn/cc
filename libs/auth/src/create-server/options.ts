import type { Db } from "@repo/db";
import type { BetterAuthOptions } from "better-auth/minimal";

import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { accountTable } from "@repo/db/schema/tables/account";
import { sessionTable } from "@repo/db/schema/tables/session";
import { userTable } from "@repo/db/schema/tables/user";
import { verificationTable } from "@repo/db/schema/tables/verification";

import type { AuthBaseUrl } from "@/schemas/base-url";
import type { AuthSecret } from "@/schemas/secret";

import {
  DEFAULT_AUTH_BASE_PATH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/constants";

export interface CreateAuthServerParams {
  db: Db;
  baseURL: AuthBaseUrl;
  basePath?: string;
  secret: AuthSecret;
}

export function createAuthServerOptions({
  db,
  baseURL,
  basePath = DEFAULT_AUTH_BASE_PATH,
  secret,
}: CreateAuthServerParams) {
  return {
    baseURL,
    basePath,
    secret,
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user: userTable,
        session: sessionTable,
        account: accountTable,
        verification: verificationTable,
      },
    }),
    advanced: {
      database: {
        generateId: false,
        joins: true,
      },
    },
    emailAndPassword: {
      enabled: true,
      minPasswordLength: MIN_PASSWORD_LENGTH,
      maxPasswordLength: MAX_PASSWORD_LENGTH,
    },
  } satisfies BetterAuthOptions;
}
