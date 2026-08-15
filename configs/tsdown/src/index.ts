import type { UserConfig } from "tsdown";

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
