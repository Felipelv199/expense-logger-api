export interface AccountRow {
  accountId: number;
  accountName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryRow {
  categoryId: number;
  budgetId: number;
  name: string;
  amount: string;
}

export interface TransactionRow {
  transactionId: number;
  name: string;
  date: Date;
  amount: number;
  accountId?: number;
  description: string;
  transactionTypeId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
