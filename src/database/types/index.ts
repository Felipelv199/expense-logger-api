import { RowDataPacket } from "mysql2";

export interface AccountRow {
  accountId: number;
  accountName: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface CategoryRow extends RowDataPacket {
  categoryId?: number | null;
  budgetId: number | null;
  name: string;
  amount: string | null;
}

export interface TransactionRow extends RowDataPacket {
  AccountId: number | null;
  Amount: number;
  CategoryId: number | null;
  CategoryName: string | null;
  CreatedAt: Date | null;
  Date: Date;
  Description: string | null;
  Name: string;
  TransactionId?: number;
  TransactionTypeId: number | null;
  UpdatedAt: Date | null;
}
