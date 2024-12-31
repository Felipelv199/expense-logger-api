import { NextFunction, Request, Response } from "express";

import { ApiError } from "../services/types";
export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status);
  res.send({ error: err });
}
