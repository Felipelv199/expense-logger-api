import { CategoryRow } from "../database/types";
import { Category, CreateCategoryRequest } from "../services/types";

export function mapCreateCategoryToCategoryRow(
  createCategoryRequest: CreateCategoryRequest,
): CategoryRow {
  return {
    Amount: createCategoryRequest.amount ?? null,
    BudgetId: createCategoryRequest.budgetId ?? null,
    Name: createCategoryRequest.name,
  } as CategoryRow;
}

export function mapCategoryRowToCategory(categoryRow: CategoryRow): Category {
  return {
    amount: categoryRow.Amount ?? undefined,
    budgetId: categoryRow.BudgetId ?? undefined,
    id: categoryRow.CategoryId ?? undefined,
    name: categoryRow.Name,
  };
}

export function mapCreateCategoryRequestToCategory(
  createCategoryRequest: CreateCategoryRequest,
  id?: number,
): Category {
  return {
    amount: createCategoryRequest.amount ?? undefined,
    budgetId: createCategoryRequest.budgetId ?? undefined,
    id,
    name: createCategoryRequest.name,
  };
}
