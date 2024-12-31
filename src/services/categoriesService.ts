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
import { findByName, insert, selectAll } from "../database/queries/categoriesQueries";
import { findByBudgetId } from "../database/queries/budgetQueries";
import { mapCategoryRowToCategory, mapCreateCategoryRequestToCategory, mapCreateCategoryToCategoryRow } from "../mappers/categoriesMapper";

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

    if (body.name) {
      const category = await findByName(body.name);

      if (category) throw new Error(ErrorMessage.CATEGORY_ALREADY_EXISTS);
    }

    const id = await insert(mapCreateCategoryToCategoryRow(body));

    res.send(mapCreateCategoryRequestToCategory(body, id));
  } catch (error: unknown) {
    next(handleError(error));
  }
}

export async function getAll(_: Request, res: Response, next: NextFunction) {
  try {
    const rows = await selectAll();
    const categories = rows.map<Category>((row) => mapCategoryRowToCategory(row));
    res.send(categories);
  } catch (error: unknown) {
    next(handleError(error));
  }
}

function handleError(err: unknown): ApiError {
  const error =
    err instanceof Error ? err : new Error("Unexpected error occured.");

  if (error.message === ErrorMessage.BUDGET_NOT_FOUND) {
    return {
      code: ErrorStatusName.NOT_ACCEPTABLE,
      message: error.message,
      status: ErrorStatusCode.NOT_ACCEPTABLE,
    };
  }

  if (error.message === ErrorMessage.CATEGORY_ALREADY_EXISTS) {
    return {
      code: ErrorStatusName.CONFLICT,
      message: error.message,
      status: ErrorStatusCode.CONFLICT,
    };
  }

  return {
    code: ErrorStatusName.GENERAL_ERROR,
    message: error.message,
    status: ErrorStatusCode.GENERAL_ERROR,
  };
}
