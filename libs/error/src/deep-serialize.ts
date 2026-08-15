import { serializeError } from "serialize-error";

import type { DeepSerializeErrorOptions } from "@/types";

export function deepSerializeError(
  error: unknown,
  options: DeepSerializeErrorOptions = {},
) {
  const { maxDepth = 50, useToJSON } = options;
  return serializeError(error, { maxDepth, useToJSON });
}
