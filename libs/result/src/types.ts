import type { AppError } from "@repo/error/types";
import type { JsonValue } from "@repo/types/json";

export interface Ok<D> {
  ok: true;
  data: D;
  metadata?: JsonValue;
}

export interface Err<E extends AppError<string>> {
  ok: false;
  error: E;
  metadata?: JsonValue;
}

export type Result<D, E extends AppError<string>> = Ok<D> | Err<E>;
