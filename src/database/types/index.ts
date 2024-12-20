export interface AccountRow {
  accountId: number;
  accountName: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface CategoryRow {
  categoryId?: number | null;
  budgetId: number | null;
  name: string;
  amount: string | null;
}

export interface TransactionRow {
  transactionId: number;
  name: string;
  date: Date;
  amount: number;
  accountId: number | null;
  description: string;
  transactionTypeId: number | null;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number | null;
}
