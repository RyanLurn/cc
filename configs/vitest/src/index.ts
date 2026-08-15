import { defineConfig } from "vitest/config";

export const testConfig = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    typecheck: {
      enabled: true,
    },
  },
});
