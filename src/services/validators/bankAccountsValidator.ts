import { CreateBankAccountRequest } from "../types";

export function validateCreateBankAccount(
  createAccountRequest: CreateBankAccountRequest,
) {
  const { name } = createAccountRequest;

  if (!name) {
    throw new Error("Missing required fields with name 'name'.");
  }
}
