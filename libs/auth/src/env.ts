import { z } from "zod";

import { DEFAULT_AUTH_BASE_PATH } from "@/constants";

export const AuthBaseUrlSchema = z.url().brand<"AuthBaseUrl">();
export type AuthBaseUrl = z.infer<typeof AuthBaseUrlSchema>;

export const AuthBasePathSchema = z
  .templateLiteral(["/", z.string()])
  .default(DEFAULT_AUTH_BASE_PATH)
  .brand<"AuthBasePath">();
export type AuthBasePath = z.infer<typeof AuthBasePathSchema>;

export const AuthSecretSchema = z.string().min(32).brand<"AuthSecret">();
export type AuthSecret = z.infer<typeof AuthSecretSchema>;
