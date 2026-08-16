import type { AuthBasePath } from "@/schemas/base-path";

export const DEFAULT_AUTH_BASE_PATH = "/api/auth" as AuthBasePath;

export const MIN_PASSWORD_LENGTH = 12;
export const MAX_PASSWORD_LENGTH = 128;

export const AUTH_BASE_URL_ENV_KEY = "AUTH_BASE_URL";
export const AUTH_BASE_PATH_ENV_KEY = "AUTH_BASE_PATH";
