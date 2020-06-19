import { HttpError } from "../../http/responses/Error";
import { logger } from "../logger";

export const onUndefined = <T>(error: HttpError, call: Function): T => {
  const value = call();
  if (value) {
    return value;
  } else {
    logger.warn(error);
    throw error;
  }
};
