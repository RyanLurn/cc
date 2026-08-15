import type { JsonPrimitive } from "@/json";

export type JsonifiableObject =
  | { [K in string]?: JsonifiableValue }
  | { toJSON: () => JsonifiableValue };
export type JsonifiableArray = readonly JsonifiableValue[];
export type JsonifiableValue =
  | JsonPrimitive
  | JsonifiableObject
  | JsonifiableArray;
