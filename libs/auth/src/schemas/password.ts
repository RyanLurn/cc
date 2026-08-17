import { z } from "zod";

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/constants";

export const PasswordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, "Password is too short.")
  .max(MAX_PASSWORD_LENGTH, "Password is too long.");
