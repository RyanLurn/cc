import type { AppError } from "@repo/error/types";
import type { JsonValue } from "@repo/types/json";

import type { Err, Ok } from "@/types";

export function ok<D>(data: D, metadata?: JsonValue): Ok<D> {
  return {
    ok: true,
    data,
    metadata,
  };
}

export function err<E extends AppError<string>>(
  error: E,
  metadata?: JsonValue,
): Err<E> {
  return {
    ok: false,
    error,
    metadata,
  };
}
