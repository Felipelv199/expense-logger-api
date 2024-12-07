export interface CreateTransactionRequest {
  amount: number;
  name: string;
  description: string;
  date: Date;
}

export interface Transaction {
  amount: number;
  name: string;
  description: string;
  date: Date;
  id: number;
}

export enum ErrorCode {
  GENERAL_ERROR = "GENERAL_ERROR",
}

export interface ApiError {
  code: ErrorCode;
  message: string;
}
