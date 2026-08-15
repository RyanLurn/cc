import { defineConfig } from "drizzle-kit";

process.loadEnvFile();

export default defineConfig({
  out: "./migrations",
  schema: "./src/schema/tables",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DIRECT_CONNECTION_STRING!,
  },
});
