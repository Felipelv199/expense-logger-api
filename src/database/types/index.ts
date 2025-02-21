import { RowDataPacket } from "mysql2";
import { PageSize } from "../../services/types";
export interface AccountRow extends RowDataPacket {
  accountId: number;
  accountName: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface CategoryRow extends RowDataPacket {
  CategoryId?: number | null;
  BudgetId: number | null;
  Name: string;
  Amount: string | null;
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

export interface CountRow extends RowDataPacket {
  Count: number;
}

export interface PaginationClause {
  offset: number;
  limit: PageSize;
}
