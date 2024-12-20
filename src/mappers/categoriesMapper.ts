import { CategoryRow } from "../database/types";
import { Category, CreateCategoryRequest } from "../services/types";

export function mapCreateCategoryToCategoryRow(
  createCategoryRequest: CreateCategoryRequest
): CategoryRow {
  return {
    name: createCategoryRequest.name,
    amount: createCategoryRequest.amount ?? null,
    budgetId: createCategoryRequest.budgetId ?? null,
  };
}

export function mapCategoryRowToCategory(categoryRow: CategoryRow): Category {
  return {
    id: categoryRow.categoryId ?? undefined,
    name: categoryRow.name,
    amount: categoryRow.amount ?? undefined,
    budgetId: categoryRow.budgetId ?? undefined,
  };
}
