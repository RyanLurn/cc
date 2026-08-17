import { createDb } from "@repo/db/create";
import { DbEnvSchema } from "@repo/db/env";
import { z } from "zod";

import { createAuthServer } from "@/create-server";
import { EmailSchema } from "@/schemas/email";
import { AuthEnvSchema } from "@/schemas/env";
import { PasswordSchema } from "@/schemas/password";

const SeedEnvSchema = z.object({
  ...DbEnvSchema.shape,
  ...AuthEnvSchema.shape,
  SEED_USER_NAME: z
    .string()
    .trim()
    .normalize("NFC")
    .min(1, "Name is required.")
    .max(100, "Name is too long."),
  SEED_USER_EMAIL: EmailSchema,
  SEED_USER_PASSWORD: PasswordSchema,
});
const env = SeedEnvSchema.parse(process.env);

const auth = createAuthServer({
  db: createDb(env.NEON_POOLED_CONNECTION_STRING),
  baseURL: env.AUTH_BASE_URL,
  secret: env.AUTH_SECRET,
});

const data = await auth.api.signUpEmail({
  body: {
    name: env.SEED_USER_NAME,
    email: env.SEED_USER_EMAIL,
    password: env.SEED_USER_PASSWORD,
  },
});
console.log("Seeded user:");
console.log(data.user);
