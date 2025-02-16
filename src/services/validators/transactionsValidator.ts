import { CreateTransactionBody, ErrorMessage } from "../types";

export function validateCreateTransactionRequest(
  createTransactionRequest: CreateTransactionBody,
) {
  const { amount, date, name } = createTransactionRequest;

  if (amount === undefined) {
    throw new Error(
      `${ErrorMessage.INVALID_TRANSACTION}: Missing required field 'amount'.`,
    );
  }

  if (date === undefined) {
    throw new Error(
      `${ErrorMessage.INVALID_TRANSACTION}: Missing required field 'date'.`,
    );
  }

  if (name === undefined) {
    throw new Error(
      `${ErrorMessage.INVALID_TRANSACTION}: Missing required field 'name'.`,
    );
  }
}

export function validateBulkCreateTransactionRequest(
  bulkCreateTransactionRequest: CreateTransactionBody[],
) {
  bulkCreateTransactionRequest.forEach(validateCreateTransactionRequest);
}
