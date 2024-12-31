import { NextFunction, Request, Response } from "express";

import { findById } from "../database/queries/categoriesQueries";
import { insert, selectAll } from "../database/queries/transactionQueries";
import {
  mapCreateTransactionRequestToTransactionRow,
  mapTransactionRowToTransaction,
} from "../mappers/transactionMapper";

import {
  ApiError,
  CreateTransactionRequest,
  ErrorMessage,
  ErrorStatusCode,
  ErrorStatusName,
  Transaction,
} from "./types";
import { validateCreateTransactionRequest } from "./validators/transactionsValidator";

export async function create(
  request: Request<object, object, CreateTransactionRequest>,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = request.body;
    validateCreateTransactionRequest(body);
    const { categoryId } = body;

    if (categoryId) {
      const category = await findById(categoryId);

      if (!category) {
        throw new Error(ErrorMessage.CATEGORY_NOT_FOUND);
      }
    }

    const row = mapCreateTransactionRequestToTransactionRow(body);
    await insert(row);

    res.status(201).send();
  } catch (error: unknown) {
    next(handleError(error));
  }
}

export async function getAll(_: Request, res: Response, next: NextFunction) {
  try {
    const transactionsRows = await selectAll();
    const transactions = transactionsRows.map<Transaction>(
      mapTransactionRowToTransaction,
    );

    res.send(transactions);
  } catch (error: unknown) {
    next(handleError(error));
  }
}

function handleError(err: unknown): ApiError {
  const error =
    err instanceof Error ? err : new Error("Unexpected error occured.");

  if (error.message === ErrorMessage.CATEGORY_NOT_FOUND) {
    return {
      code: ErrorStatusName.NOT_ACCEPTABLE,
      message: error.message,
      status: ErrorStatusCode.NOT_ACCEPTABLE,
    };
  }

  return {
    code: ErrorStatusName.GENERAL_ERROR,
    message: error.message,
    status: ErrorStatusCode.GENERAL_ERROR,
  };
}
