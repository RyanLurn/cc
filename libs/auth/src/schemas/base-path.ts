import { z } from "zod";

export const AuthBasePathSchema = z
  .templateLiteral(["/", z.string()])
  .brand<"AuthBasePath">();
export type AuthBasePath = z.infer<typeof AuthBasePathSchema>;
