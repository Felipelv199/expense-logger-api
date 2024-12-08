import { NextFunction, Request, Response } from "express";
import { insert, selectAll } from "../database/queries/transactionQueries";
import {
  ApiError,
  CreateTransactionRequest,
  ErrorCode,
  Transaction,
} from "./types";
import { validateCreateTransactionRequest } from "./validators/transactionsValidators";

export async function getAll(_: Request, res: Response, next: NextFunction) {
  try {
    const transactionsRows = await selectAll();
    const transactions = transactionsRows.map<Transaction>((tr) => ({
      amount: tr.amount,
      date: tr.date,
      description: tr.description,
      id: tr.transactionId,
      name: tr.name,
    }));

    res.send(transactions);
  } catch (error: unknown) {
    next(handleError(error));
  }
}

export async function create(
  request: Request<object, object, CreateTransactionRequest>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = request.body;

    validateCreateTransactionRequest(body);
    await insert(Object.values(body));

    res.status(201).send();
  } catch (error: unknown) {
    next(handleError(error));
  }
}

function handleError(error: unknown): ApiError {
  if (error instanceof Error) {
    return {
      code: ErrorCode.GENERAL_ERROR,
      message: error.message,
    };
  }
  return {
    code: ErrorCode.GENERAL_ERROR,
    message: "Unexpected error occured.",
  };
}
