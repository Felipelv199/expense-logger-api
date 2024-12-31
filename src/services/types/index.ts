export interface CreateTransactionRequest {
  amount: number;
  name: string;
  description?: string;
  date: string;
  categoryId?: number;
}

export interface Transaction {
  amount: number;
  name: string;
  description?: string;
  date: Date;
  id?: number;
  category?: Category;
}

export enum ErrorMessage {
  GENERAL_ERROR = "General error",
  BUDGET_NOT_FOUND = "Budget not found",
  CATEGORY_NOT_FOUND = "Category not found",
  CATEGORY_ALREADY_EXISTS = "Category already exists",
}

export enum ErrorStatusName {
  GENERAL_ERROR = "GENERAL_ERROR",
  NOT_ACCEPTABLE = "NOT_ACCEPTABLE",
  CONFLICT = "CONFLICT",
}

export enum ErrorStatusCode {
  GENERAL_ERROR = 500,
  NOT_ACCEPTABLE = 406,
  CONFLICT = 409,
}

export interface ApiError {
  status: ErrorStatusCode;
  code: ErrorStatusName;
  message: string;
}

export interface CreateBankAccountRequest {
  name: string;
}

export interface BankAccount {
  id: number;
  name: string;
}

export interface CreateCategoryRequest {
  amount?: string;
  budgetId?: number;
  name: string;
}

export interface Category {
  id?: number;
  amount?: string;
  name: string;
  budgetId?: number;
}
