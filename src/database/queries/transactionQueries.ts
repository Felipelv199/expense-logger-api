import { createPool } from "..";
import {
  CountRow,
  PaginationClause as PaginationClauses,
  TransactionRow,
} from "../types";

const pool = createPool();

export async function updateQuery(transactionRow: TransactionRow) {
  if (transactionRow.CategoryId)
    await pool.query(
      "UPDATE transactions SET Amount = ?, Date = ?, Description = ?, Name = ?, CategoryId = ? WHERE TransactionId = ?;",
      [
        transactionRow.Amount,
        transactionRow.Date,
        transactionRow.Description,
        transactionRow.Name,
        transactionRow.CategoryId,
        transactionRow.TransactionId,
      ],
    );
  else
    await pool.query(
      "UPDATE transactions SET Amount = ?, Date = ?, Description = ?, Name = ? WHERE TransactionId = ?;",
      [
        transactionRow.Amount,
        transactionRow.Date,
        transactionRow.Description,
        transactionRow.Name,
        transactionRow.TransactionId,
      ],
    );
}

export async function insertQuery(transactionRow: TransactionRow) {
  if (transactionRow.CategoryId)
    await pool.query(
      "INSERT INTO transactions (Amount, Date, Description, Name, CategoryId) VALUES (?, ?, ?, ?, ?);",
      [
        transactionRow.Amount,
        transactionRow.Date,
        transactionRow.Description,
        transactionRow.Name,
        transactionRow.CategoryId,
      ],
    );
  else
    await pool.query(
      "INSERT INTO transactions (Amount, Date, Description, Name) VALUES (?, ?, ?, ?);",
      [
        transactionRow.Amount,
        transactionRow.Date,
        transactionRow.Description,
        transactionRow.Name,
      ],
    );
}

export async function insertAllQuery(transactionRows: TransactionRow[]) {
  if (transactionRows.length === 0) return;

  // Separate rows based on whether they have CategoryId
  const withCategory = transactionRows.filter((row) => row.CategoryId);
  const withoutCategory = transactionRows.filter((row) => !row.CategoryId);

  // Insert rows with CategoryId
  if (withCategory.length > 0) {
    const valuePlaceholders = withCategory
      .map(() => "(?, ?, ?, ?, ?)")
      .join(", ");
    const values = withCategory.flatMap((row) => [
      row.Amount,
      row.Date,
      row.Description,
      row.Name,
      row.CategoryId,
    ]);

    await pool.query(
      `INSERT INTO transactions (Amount, Date, Description, Name, CategoryId) VALUES ${valuePlaceholders};`,
      values,
    );
  }

  // Insert rows without CategoryId
  if (withoutCategory.length > 0) {
    const valuePlaceholders = withoutCategory
      .map(() => "(?, ?, ?, ?)")
      .join(", ");
    const values = withoutCategory.flatMap((row) => [
      row.Amount,
      row.Date,
      row.Description,
      row.Name,
    ]);

    await pool.query(
      `INSERT INTO transactions (Amount, Date, Description, Name) VALUES ${valuePlaceholders};`,
      values,
    );
  }
}

export async function selectAllQuery(
  clause: PaginationClauses,
): Promise<TransactionRow[]> {
  const [rows] = await pool.query<TransactionRow[]>(
    `SELECT t.*, c.Name AS CategoryName 
      FROM transactions t 
      LEFT JOIN categories c ON t.CategoryId = c.CategoryId 
      ORDER BY t.Date DESC 
      LIMIT ? OFFSET ?;
    `,
    [clause.limit, clause.offset],
  );
  return rows;
}

export async function countAllQuery(): Promise<number> {
  const [rows] = await pool.query<CountRow[]>(
    "SELECT COUNT(*) AS Count FROM transactions;",
  );
  return rows[0].Count;
}

export async function selectWhereIdQuery(
  id: number,
): Promise<TransactionRow | undefined> {
  const [rows] = await pool.query<TransactionRow[]>(
    "SELECT * FROM transactions WHERE TransactionId = ?;",
    [id],
  );
  return rows.length > 0 ? rows[0] : undefined;
}

export async function selectWhereAmountDateNameQuery(
  amount: number,
  date: Date,
  name: string,
): Promise<TransactionRow | undefined> {
  const [rows] = await pool.query<TransactionRow[]>(
    "SELECT * FROM transactions WHERE Amount = ? AND Date = ? AND Name = ?;",
    [amount, date, name],
  );
  return rows.length > 0 ? rows[0] : undefined;
}
