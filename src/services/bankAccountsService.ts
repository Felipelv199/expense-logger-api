import { NextFunction, Request, Response } from "express";
import {
  BankAccount,
  ApiError,
  ErrorCode,
  CreateBankAccountRequest,
} from "./types";
import { validateCreateBankAccount } from "./validators/bankAccounts";
import { insert, selectAll } from "../database/queries/accountQueries";

export async function create(
  request: Request<object, object, CreateBankAccountRequest>,
  response: Response,
  next: NextFunction
) {
  try {
    const data = request.body;

    validateCreateBankAccount(data);
    await insert(Object.values(data));

    response.send(201).send();
  } catch (error: unknown) {
    next(handleError(error));
  }
}

export async function getAll(_: Request, res: Response, next: NextFunction) {
  try {
    const accountsRows = await selectAll();
    const transactions = accountsRows.map<BankAccount>((tr) => ({
      id: tr.accountId,
      name: tr.accountName,
    }));

    res.send(transactions);
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
