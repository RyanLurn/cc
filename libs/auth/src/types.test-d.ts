import type { ValueOf } from "@repo/types/object";

import { describe, expectTypeOf, test } from "vitest";

import type {
  AuthErrorCode,
  AuthSession,
  AuthUser,
  TanstackStartAuthServer,
} from "@/types";

describe("AuthServer and TanstackStartAuthServer should infer the same", () => {
  test("error code type", () => {
    type TanStackStartAuthErrorCode = ValueOf<
      TanstackStartAuthServer["$ERROR_CODES"]
    >["code"];

    expectTypeOf<AuthErrorCode>().toEqualTypeOf<TanStackStartAuthErrorCode>();
  });

  test("session type", () => {
    type TanstackStartAuthSession =
      TanstackStartAuthServer["$Infer"]["Session"]["session"];

    expectTypeOf<AuthSession>().toMatchObjectType<TanstackStartAuthSession>();
  });

  test("user type", () => {
    type TanstackStartAuthUser =
      TanstackStartAuthServer["$Infer"]["Session"]["user"];

    expectTypeOf<AuthUser>().toMatchObjectType<TanstackStartAuthUser>();
  });
});
