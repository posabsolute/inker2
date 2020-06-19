import { HttpError } from "../../http/responses/Error";
import { logger } from "../logger";

function isNestedError(err: HttpError | any): err is HttpError {
  return (err as HttpError).httpCode !== undefined;
}

export const onError = <T>(error: HttpError, call: Function): T => {
  try {
    const value = call();
    return value;
  } catch (err) {
    logger.error(err);
    throw isNestedError(err) ? err : error;
  }
};
