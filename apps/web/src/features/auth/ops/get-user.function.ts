import type { UnauthenticatedError } from "@repo/auth/errors";
import type { AuthUser } from "@repo/auth/types";
import type { InvalidEnvError } from "@repo/env/error";
import type { UnexpectedError } from "@repo/error/classes/unexpected";
import type { FlatErrorObject } from "@repo/error/types";
import type { Result } from "@repo/result/types";

import { getAuthUser } from "@repo/auth/ops/get-user";
import { HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD } from "@repo/http/response-statuses/error/client";
import { HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD } from "@repo/http/response-statuses/error/server";
import { err } from "@repo/result/utils";
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeaders,
  setResponseStatus,
} from "@tanstack/react-start/server";

import { getAuthServer } from "@/features/auth/ops/get-server.server";

export const getUser = createServerFn().handler(
  async (): Promise<
    Result<
      AuthUser,
      | FlatErrorObject<InvalidEnvError["code"]>
      | FlatErrorObject<UnauthenticatedError["code"]>
      | FlatErrorObject<UnexpectedError["code"]>
    >
  > => {
    const getAuthServerResult = getAuthServer();
    if (!getAuthServerResult.ok) {
      const httpError =
        HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD.INTERNAL_SERVER_ERROR;
      setResponseStatus(httpError.code, httpError.text);
      return err(getAuthServerResult.error.shallowSerialize());
    }
    const authServer = getAuthServerResult.data;

    const getAuthUserResult = await getAuthUser({
      authServer,
      headers: getRequestHeaders(),
    });

    if (getAuthUserResult.ok) {
      return getAuthUserResult;
    }

    const error = getAuthUserResult.error;
    if (error.code === "UNAUTHENTICATED_ERROR") {
      const httpError = HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD.UNAUTHORIZED;
      setResponseStatus(httpError.code, httpError.text);
    } else {
      const httpError =
        HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD.INTERNAL_SERVER_ERROR;
      setResponseStatus(httpError.code, httpError.text);
    }
    return err(error.shallowSerialize());
  },
);
