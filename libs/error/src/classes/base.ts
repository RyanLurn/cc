import type {
  AppError,
  DeepSerializeErrorOptions,
  FlatErrorObject,
  NestedErrorObject,
} from "@/types";

import { deepSerializeError } from "@/deep-serialize";

export abstract class BaseError<Code extends string, Cause = unknown>
  extends Error
  implements AppError<Code>
{
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  abstract readonly code: Code;
  declare cause: Cause;

  constructor({ message, cause }: { message: string; cause: Cause }) {
    super(message, { cause });
  }

  shallowSerialize(): FlatErrorObject<Code> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
    };
  }

  deepSerialize(options: DeepSerializeErrorOptions = {}): NestedErrorObject {
    return deepSerializeError(this, options);
  }
}
