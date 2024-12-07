import { CreateTransactionRequest } from "../types";

export function validateCreateTransactionRequest(
  createTransactionRequest: CreateTransactionRequest
) {
  const {amount, date, description, name} = createTransactionRequest;

  if (!amount) {
    throw new Error(`Missing required fields with name 'amount'.`);
  }

  if (!date) {
    throw new Error(`Missing required fields with name 'date'.`);
  }

  if (!description) {
    throw new Error(`Missing required fields with name 'description'.`);
  }

  if (!name) {
    throw new Error(`Missing required fields with name 'name'.`);
  }
}
