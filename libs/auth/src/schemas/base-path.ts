import { z } from "zod";

import { DEFAULT_AUTH_BASE_PATH } from "@/constants";

export const AuthBasePathSchema = z
  .templateLiteral(["/", z.string()])
  .default(DEFAULT_AUTH_BASE_PATH)
  .brand<"AuthBasePath">();
export type AuthBasePath = z.infer<typeof AuthBasePathSchema>;
