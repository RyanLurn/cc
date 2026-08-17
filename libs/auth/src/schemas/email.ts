import { z } from "zod";

import { INVALID_EMAIL_ERROR_MESSAGE } from "@/constants";

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .normalize("NFC")
  .pipe(z.email(INVALID_EMAIL_ERROR_MESSAGE).max(254, "Email is too long."));
