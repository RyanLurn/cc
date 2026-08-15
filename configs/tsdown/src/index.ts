import type { UserConfig } from "tsdown";

import babel from "@rolldown/plugin-babel";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "tsdown";

export type LibConfigOptions = Pick<UserConfig, "platform" | "exports">;

export function createLibConfig({
  platform = "neutral",
  exports = true,
}: LibConfigOptions): UserConfig {
  return {
    entry: [
      "src/**/*.{ts,tsx}",
      "!src/**/*.{test,test-d,try}.{ts,tsx}",
      "!src/try.ts",
    ],
    dts: {
      sourcemap: true,
    },
    unbundle: true,
    platform,
    exports,
  };
}

export function createReactLibConfig({
  platform = "neutral",
  exports = true,
}: LibConfigOptions) {
  const libConfig = createLibConfig({ platform, exports });
  return defineConfig({
    ...libConfig,
    plugins: [
      babel({
        presets: [reactCompilerPreset()],
      }),
    ],
  });
}
