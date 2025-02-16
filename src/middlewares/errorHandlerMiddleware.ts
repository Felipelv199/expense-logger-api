import { NextFunction, Request, Response } from "express";

import {
  ApiError,
  ErrorMessage,
  ErrorStatusCode,
  ErrorStatusName,
} from "../services/types";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiError = getApiError(err);
  res.status(apiError.status);
  res.send({ code: apiError.code, message: apiError.message });
  next();
}

function getApiError(err: unknown): ApiError {
  if (
    err instanceof Error &&
    (err.message.includes(ErrorMessage.INVALID_TRANSACTION) ||
      err.message.includes(ErrorMessage.INVALID_PAGE) ||
      err.message.includes(ErrorMessage.INVALID_PAGE_SIZE))
  ) {
    return {
      code: ErrorStatusName.BAD_REQUEST,
      message: err.message,
      status: ErrorStatusCode.BAD_REQUEST,
    };
  }

  if (
    err instanceof Error &&
    err.message.includes(ErrorMessage.CATEGORY_NOT_FOUND)
  ) {
    return {
      code: ErrorStatusName.NOT_FOUND,
      message: err.message,
      status: ErrorStatusCode.NOT_FOUND,
    };
  }

  if (err instanceof Error) {
    return {
      code: ErrorStatusName.GENERAL_ERROR,
      message: err.message,
      status: ErrorStatusCode.GENERAL_ERROR,
    };
  }

  return {
    code: ErrorStatusName.GENERAL_ERROR,
    message: "Unexpected error occured.",
    status: ErrorStatusCode.GENERAL_ERROR,
  };
}
