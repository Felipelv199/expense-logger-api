import { ErrorMessage, PageSize, PaginationQuery } from "../types";

const VALID_PAGE_SIZES: PageSize[] = [10, 25, 50, 100];

export function validatePartialPaginationQuery(
  query: Partial<PaginationQuery>,
  total: number,
) {
  const { page, pageSize } = query;
  const pageNumber = Number(page ?? 1);
  const pageSizeNumber = Number(pageSize ?? 10);

  if (isNaN(pageNumber)) {
    throw new Error(`${ErrorMessage.INVALID_PAGE}: Page must be a number`);
  }

  if (isNaN(pageSizeNumber)) {
    throw new Error(
      `${ErrorMessage.INVALID_PAGE_SIZE}: Page size must be a number`,
    );
  }

  if (pageNumber < 1) {
    throw new Error(
      `${ErrorMessage.INVALID_PAGE}: Page must be greater than 0`,
    );
  }

  if (!VALID_PAGE_SIZES.some((ps) => ps === pageSizeNumber)) {
    throw new Error(
      `${ErrorMessage.INVALID_PAGE_SIZE}: Page size must be one of the following: ${VALID_PAGE_SIZES.join(
        ", ",
      )}`,
    );
  }

  const offset = (pageNumber - 1) * pageSizeNumber;

  if (offset > total) {
    throw new Error(
      `${ErrorMessage.INVALID_PAGE}: Page number is out of range`,
    );
  }
}
