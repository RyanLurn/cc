import { testConfig } from "@repo/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

import { sharedConfig } from "./shared.config.ts";

export default defineConfig((configEnv) =>
  mergeConfig(sharedConfig(configEnv), defineConfig({ test: testConfig.test })),
);
