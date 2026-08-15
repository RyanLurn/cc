import type { ZodError } from "zod";

import { BaseError } from "@repo/error/classes/base";

export class InvalidEnvError extends BaseError<"INVALID_ENV_ERROR", ZodError> {
  readonly name = "InvalidEnvError";
  readonly code = "INVALID_ENV_ERROR";
}
