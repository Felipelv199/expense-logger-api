import { NextFunction, Request, Response } from "express";
import {
  ApiError,
  Category,
  CreateCategoryRequest,
  ErrorMessage,
  ErrorStatusCode,
  ErrorStatusName,
} from "./types";
import { validateCreateCategoryRequest } from "./validators/categoriesValidator";
import { insert, selectAll } from "../database/queries/categoriesQueries";
import { findByBudgetId } from "../database/queries/budgetQueries";

export async function create(
  req: Request<object, object, CreateCategoryRequest>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    validateCreateCategoryRequest(body);

    const budgetId = body.budgetId;
    const result = budgetId ? await findByBudgetId(budgetId) : [[], []];
    const [rows] = result;

    if (budgetId && rows.length === 0)
      throw new Error(ErrorMessage.BUDGET_NOT_FOUND);

    await insert(Object.values(body));

    res.status(201).send();
  } catch (error: unknown) {
    next(handleError(error));
  }
}

export async function getAll(_: Request, res: Response, next: NextFunction) {
  try {
    const rows = await selectAll();
    const category = rows.map<Category>((tr) => ({
      amount: tr.amount,
      name: tr.name,
      id: tr.categoryId,
    }));

    res.send(category);
  } catch (error: unknown) {
    next(handleError(error));
  }
}

function handleError(err: unknown): ApiError {
  const error = err instanceof Error ? err : new Error("Unexpected error occured.");

  if (error.message === ErrorMessage.BUDGET_NOT_FOUND) {
    return {
      status: ErrorStatusCode.NOT_ACCEPTABLE,
      code: ErrorStatusName.NOT_ACCEPTABLE,
      message: error.message,
    };
  }

  return {
    status: ErrorStatusCode.GENERAL_ERROR,
    code: ErrorStatusName.GENERAL_ERROR,
    message: error.message,
  };
}
