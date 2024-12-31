import { NextFunction, Request, Response } from "express";

import { insert, selectAll } from "../database/queries/accountQueries";
import {
  mapAccountRowToBankAccount,
  mapCreateBankAccountRequestToAccountRow,
} from "../mappers/bankAccountsMapper";

import {
  BankAccount,
  ApiError,
  CreateBankAccountRequest,
  ErrorStatusCode,
  ErrorStatusName,
} from "./types";
import { validateCreateBankAccount } from "./validators/bankAccountsValidator";

export async function create(
  request: Request<object, object, CreateBankAccountRequest>,
  response: Response,
  next: NextFunction,
) {
  try {
    const data = request.body;
    validateCreateBankAccount(data);
    await insert(mapCreateBankAccountRequestToAccountRow(data));

    response.send(201).send();
  } catch (error: unknown) {
    next(handleError(error));
  }
}

export async function getAll(_: Request, res: Response, next: NextFunction) {
  try {
    const accountsRows = await selectAll();
    const transactions = accountsRows.map<BankAccount>(
      mapAccountRowToBankAccount,
    );

    res.send(transactions);
  } catch (error: unknown) {
    next(handleError(error));
  }
}

function handleError(err: unknown): ApiError {
  const error =
    err instanceof Error ? err : new Error("Unexpected error occured.");

  return {
    code: ErrorStatusName.GENERAL_ERROR,
    message: error.message,
    status: ErrorStatusCode.GENERAL_ERROR,
  };
}
