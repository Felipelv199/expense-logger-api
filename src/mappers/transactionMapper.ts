import { TransactionRow } from "../database/types";
import { CreateTransactionRequest, Transaction } from "../services/types";

export function mapCreateTransactionRequestToTransactionRow(
  createTransactionRequest: CreateTransactionRequest
): TransactionRow {
  return {
    Amount: createTransactionRequest.amount,
    AccountId: null,
    CreatedAt: null,
    CategoryId: createTransactionRequest.categoryId ?? null,
    Date: new Date(createTransactionRequest.date),
    Description: createTransactionRequest.description,
    Name: createTransactionRequest.name,
    TransactionTypeId: null,
    UpdatedAt: null,
  } as TransactionRow;
}

export function mapTransactionRowToTransaction(
  transactionRow: TransactionRow
): Transaction {
  return {
    amount: transactionRow.Amount,
    date: transactionRow.Date,
    description: transactionRow.Description ?? undefined,
    id: transactionRow.TransactionId,
    name: transactionRow.Name,
    category:
      transactionRow.CategoryName && transactionRow.CategoryId
        ? {
            name: transactionRow.CategoryName,
            id: transactionRow.CategoryId,
          }
        : undefined,
  };
}
