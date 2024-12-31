import { CategoryRow } from "../database/types";
import { Category, CreateCategoryRequest } from "../services/types";

export function mapCreateCategoryToCategoryRow(
  createCategoryRequest: CreateCategoryRequest
): CategoryRow {
  return {
    amount: createCategoryRequest.amount ?? null,
    budgetId: createCategoryRequest.budgetId ?? null,
    name: createCategoryRequest.name,
  };
}

export function mapCategoryRowToCategory(categoryRow: CategoryRow): Category {
  return {
    amount: categoryRow.amount ?? undefined,
    budgetId: categoryRow.budgetId ?? undefined,
    id: categoryRow.categoryId ?? undefined,
    name: categoryRow.name,
  };
}

export function mapCreateCategoryRequestToCategory(createCategoryRequest: CreateCategoryRequest, id?: number): Category {
  return {
    amount: createCategoryRequest.amount ?? undefined,
    budgetId: createCategoryRequest.budgetId ?? undefined,
    id,
    name: createCategoryRequest.name,
  };
}
