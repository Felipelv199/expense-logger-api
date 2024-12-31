import { CreateTransactionRequest } from "../types";

export function validateCreateTransactionRequest(
  createTransactionRequest: CreateTransactionRequest
) {
  const { amount, date, name } = createTransactionRequest;

  if (!amount) {
    throw new Error(`Missing required fields with name 'amount'.`);
  }

  if (!date) {
    throw new Error(`Missing required fields with name 'date'.`);
  }

  if (!name) {
    throw new Error(`Missing required fields with name 'name'.`);
  }
}
