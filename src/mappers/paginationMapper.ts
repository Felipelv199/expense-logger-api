import { PaginationClause } from "../database/types";
import {
  PageResponsePagination,
  PageSize,
  PaginationQuery,
} from "../services/types";

export function mapPaginationClauseToPaginationQuery(
  clause: PaginationClause,
): PaginationQuery {
  return {
    page: (clause.offset / clause.limit + 1).toString(),
    pageSize: clause.limit.toString(),
  };
}

export function mapPartialPaginationQueryToPaginationClause(
  query: Partial<PaginationQuery>,
): PaginationClause {
  const pageNumber = Number(query.page ?? 1);
  const pageSizeNumber = Number(query.pageSize ?? 10) as PageSize;

  return {
    limit: pageSizeNumber,
    offset: (pageNumber - 1) * pageSizeNumber,
  };
}

export function mapPaginationClauseToPageResponsePagination(
  clause: PaginationClause,
  total: number,
): PageResponsePagination {
  return {
    page: clause.offset / clause.limit + 1,
    pageSize: clause.limit,
    total: total,
    totalPages: Math.ceil(total / clause.limit),
  };
}
