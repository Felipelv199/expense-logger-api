import { RowDataPacket } from "mysql2";

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

export interface AccountRow {
  accountId: number;
  accountName: string;
  createdAt?: Date;
  updatedAt?: Date;
}
