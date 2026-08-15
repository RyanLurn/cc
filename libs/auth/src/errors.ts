import { BaseError } from "@repo/error/classes/base";

export class UnauthenticatedError extends BaseError<"UNAUTHENTICATED_ERROR"> {
  readonly name = "UnauthenticatedError";
  readonly code = "UNAUTHENTICATED_ERROR";
}
