import type { DEFAULT_AUTH_BASE_PATH } from "@repo/auth/constants";
import type { ToOptions } from "@tanstack/react-router";

import { expectTypeOf, test } from "vitest";

test("Parent path should match default auth base path", () => {
  expectTypeOf<
    Extract<ToOptions["to"], `${typeof DEFAULT_AUTH_BASE_PATH}/$`>
  >().not.toBeNever();
});
