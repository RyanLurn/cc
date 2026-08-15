export type {
  ErrorObject as NestedErrorObject,
  Options as DeepSerializeErrorOptions,
} from "serialize-error";

export interface AppError<Code extends string> extends Error {
  code: Code;
}

export type FlatErrorObject<Code extends string> = Pick<
  AppError<Code>,
  "name" | "message" | "code"
>;
