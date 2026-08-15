import type { ViteUserConfig } from "vitest/config";

export const testConfig = {
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    typecheck: {
      enabled: true,
    },
  },
} satisfies ViteUserConfig;
