import type { ValueOf } from "@repo/types/object";

import { HTTP_ERROR_RESPONSE_STATUS_RECORD } from "@/constants/response-statuses/error";
import { HTTP_SUCCESSFUL_RESPONSE_STATUS_RECORD } from "@/constants/response-statuses/success";

export const HTTP_RESPONSE_STATUS_RECORD = {
  ...HTTP_SUCCESSFUL_RESPONSE_STATUS_RECORD,
  ...HTTP_ERROR_RESPONSE_STATUS_RECORD,
} as const;

export type HttpResponseStatusRecord = typeof HTTP_RESPONSE_STATUS_RECORD;
export type HttpResponseStatusCode = ValueOf<HttpResponseStatusRecord>["code"];
export type HttpResponseStatusText = ValueOf<HttpResponseStatusRecord>["text"];
