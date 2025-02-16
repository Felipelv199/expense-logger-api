import { NextFunction, Request, Response } from "express";

import { findById } from "../database/queries/categoriesQueries";
import {
  insertQuery,
  insertAllQuery,
  selectAllQuery,
  selectWhereIdQuery,
  updateQuery,
  countAllQuery,
  selectWhereAmountDateNameQuery,
} from "../database/queries/transactionQueries";
import { CategoryRow } from "../database/types";
import {
  mapPaginationClauseToPageResponsePagination,
  mapPartialPaginationQueryToPaginationClause,
} from "../mappers/paginationMapper";
import {
  mapCreateTransactionRequestToTransactionRow,
  mapTransactionRowToTransaction,
} from "../mappers/transactionMapper";

import {
  CreateTransactionBody,
  ErrorMessage,
  PageResponse,
  PaginationQuery,
  Transaction,
} from "./types";
import { validatePartialPaginationQuery } from "./validators/paginationsValidator";
import {
  validateBulkCreateTransactionRequest,
  validateCreateTransactionRequest,
} from "./validators/transactionsValidator";

export async function create(
  request: Request<object, object, CreateTransactionBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = request.body;
    validateCreateTransactionRequest(body);
    const { categoryId } = body;

    if (categoryId) {
      const category = await findById(categoryId);

      if (!category) {
        throw new Error(ErrorMessage.CATEGORY_NOT_FOUND);
      }
    }

    const row = mapCreateTransactionRequestToTransactionRow(body);
    await insertQuery(row);

    res.status(201).send();
  } catch (error: unknown) {
    next(error);
  }
}

export async function createBulk(
  request: Request<object, object, CreateTransactionBody[]>,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = request.body;
    const categories: Record<number, CategoryRow> = {};

    validateBulkCreateTransactionRequest(body);

    const errors: string[] = [];

    for (const transaction of body) {
      try {
        validateCreateTransactionRequest(transaction);
        const transactionRow = await selectWhereAmountDateNameQuery(
          transaction.amount,
          new Date(transaction.date),
          transaction.name,
        );

        if (transactionRow) {
          throw new Error(ErrorMessage.TRANSACTION_ALREADY_EXISTS);
        }
      } catch (error: unknown) {
        const index = body.indexOf(transaction);
        if (error instanceof Error) {
          errors.push(`${error.message} at index ${index}`);
        } else {
          errors.push(`${ErrorMessage.GENERAL_ERROR} at index ${index}`);
        }
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }

    const rows = await Promise.all(
      body.map(async (transaction) => {
        if (transaction.categoryId) {
          const category =
            categories[transaction.categoryId] ??
            (await findById(transaction.categoryId));

          if (!category) {
            throw new Error(ErrorMessage.CATEGORY_NOT_FOUND);
          }

          categories[category.id] = category;
        }

        return mapCreateTransactionRequestToTransactionRow(transaction);
      }),
    );

    await insertAllQuery(rows);

    res.status(201).send();
  } catch (error: unknown) {
    next(error);
  }
}

export async function update(
  request: Request<{ id: number }, object, CreateTransactionBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = request.body;
    validateCreateTransactionRequest(body);

    const { id } = request.params;
    const transaction = await selectWhereIdQuery(id);

    if (!transaction) {
      throw new Error(ErrorMessage.TRANSACTION_NOT_FOUND);
    }

    const row = mapCreateTransactionRequestToTransactionRow(body);
    await updateQuery(row);

    res.status(204).send();
  } catch (error: unknown) {
    next(error);
  }
}

export async function getByPage(
  request: Request<object, object, object, Partial<PaginationQuery>>,
  res: Response<PageResponse<Transaction>>,
  next: NextFunction,
) {
  try {
    const query = request.query;
    const count = await countAllQuery();
    validatePartialPaginationQuery(query, count);

    const paginationClause = mapPartialPaginationQueryToPaginationClause(query);
    const transactionsRows = await selectAllQuery(paginationClause);
    const transactions = transactionsRows.map<Transaction>(
      mapTransactionRowToTransaction,
    );
    const paginationQuery = mapPaginationClauseToPageResponsePagination(
      paginationClause,
      count,
    );
    const pageResponse: PageResponse<Transaction> = {
      data: transactions,
      ...paginationQuery,
    };

    res.send(pageResponse);
  } catch (error: unknown) {
    next(error);
  }
}

export async function getById(
  request: Request<{ id: number }, object, object>,
  res: Response<Transaction>,
  next: NextFunction,
) {
  try {
    const { id } = request.params;
    const transaction = await selectWhereIdQuery(id);

    if (!transaction) {
      throw new Error(ErrorMessage.TRANSACTION_NOT_FOUND);
    }

    res.send(mapTransactionRowToTransaction(transaction));
  } catch (error: unknown) {
    next(error);
  }
}
