export interface CreateTransactionBody {
  amount: number;
  name: string;
  description?: string;
  date: string;
  categoryId?: number;
}

export interface TransactionParams {
  id?: number;
}

export type PageSize = 10 | 25 | 50 | 100;

export interface PaginationQuery {
  page: string;
  pageSize: string;
}

export interface PageResponsePagination {
  page: number;
  pageSize: PageSize;
  total: number;
  totalPages: number;
}

export interface PageResponse<T> extends PageResponsePagination {
  data: T[];
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
  TRANSACTION_ALREADY_EXISTS = "Transaction already exists",
  TRANSACTION_NOT_FOUND = "Transaction not found",
  INVALID_PAGE = "Invalid page",
  INVALID_PAGE_SIZE = "Invalid page size",
  INVALID_TRANSACTION = "Invalid transaction",
}

export enum ErrorStatusName {
  GENERAL_ERROR = "GENERAL_ERROR",
  NOT_FOUND = "NOT_FOUND",
  NOT_ACCEPTABLE = "NOT_ACCEPTABLE",
  CONFLICT = "CONFLICT",
  BAD_REQUEST = "BAD_REQUEST",
}

export enum ErrorStatusCode {
  GENERAL_ERROR = 500,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  CONFLICT = 409,
  BAD_REQUEST = 400,
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
