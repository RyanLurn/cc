/// <reference types="vitest/config" />

import { AuthViteEnvSchema } from "@repo/auth/schemas/env/vite";
import { VITE_ENV_KEY_PREFIX } from "@repo/env/constants";
import { testConfig } from "@repo/vitest-config";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), VITE_ENV_KEY_PREFIX);
  const parseEnvResult = AuthViteEnvSchema.safeParse(viteEnv, {
    // It's safe to report input here since env vars prefixed with VITE_ will be in the client bundle
    reportInput: true,
  });
  if (!parseEnvResult.success) {
    console.error("Invalid or missing auth env var(s):");
    console.error(parseEnvResult.error.issues);
    process.exit(1);
  }

  return {
    plugins: [
      // Make sure that '@tanstack/react-start/plugin/vite' is passed before '@vitejs/plugin-react'
      tanstackStart({
        router: {
          quoteStyle: "double",
          semicolons: true,
        },
      }),
      babel({ presets: [reactCompilerPreset()] }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: 5173,
    },
    test: testConfig.test,
  };
});
