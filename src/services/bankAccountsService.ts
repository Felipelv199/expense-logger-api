import { NextFunction, Request, Response } from "express";
import {
  BankAccount,
  ApiError,
  CreateBankAccountRequest,
  ErrorStatusCode,
  ErrorStatusName,
} from "./types";
import { validateCreateBankAccount } from "./validators/bankAccountsValidator";
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

function handleError(err: unknown): ApiError {
  const error = err instanceof Error ? err : new Error("Unexpected error occured.");

  return {
    code: ErrorStatusName.GENERAL_ERROR,
    message: error.message,
    status: ErrorStatusCode.GENERAL_ERROR,
  };
}
