import { CreateCategoryRequest } from "../types";

export function validateCreateCategoryRequest(
  createCategoryRequest: CreateCategoryRequest,
) {
  const { name } = createCategoryRequest;

  if (!name) throw new Error("Missing required fields with name 'name'.");
}
