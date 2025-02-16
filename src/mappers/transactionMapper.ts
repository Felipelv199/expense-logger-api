import { TransactionRow } from "../database/types";
import { CreateTransactionBody, Transaction } from "../services/types";

export function mapCreateTransactionRequestToTransactionRow(
  createTransactionRequest: CreateTransactionBody,
): TransactionRow {
  return {
    AccountId: null,
    Amount: createTransactionRequest.amount,
    CategoryId: createTransactionRequest.categoryId ?? null,
    CreatedAt: null,
    Date: new Date(createTransactionRequest.date),
    Description: createTransactionRequest.description,
    Name: createTransactionRequest.name,
    TransactionTypeId: null,
    UpdatedAt: null,
  } as TransactionRow;
}

export function mapTransactionRowToTransaction(
  transactionRow: TransactionRow,
): Transaction {
  return {
    amount: transactionRow.Amount,
    category:
      transactionRow.CategoryName && transactionRow.CategoryId
        ? {
            id: transactionRow.CategoryId,
            name: transactionRow.CategoryName,
          }
        : undefined,
    date: transactionRow.Date,
    description: transactionRow.Description ?? undefined,
    id: transactionRow.TransactionId,
    name: transactionRow.Name,
  };
}
