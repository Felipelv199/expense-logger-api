import { createPool } from "..";
import { TransactionRow } from "../types";

const pool = createPool();

export async function insert(transactionRow: TransactionRow) {
  if (transactionRow.CategoryId)
    await pool.query(
      "INSERT INTO transactions (Amount, Date, Description, Name, CategoryId) VALUES (?, ?, ?, ?, ?);",
      [
        transactionRow.Amount,
        transactionRow.Date,
        transactionRow.Description,
        transactionRow.Name,
        transactionRow.CategoryId,
      ]
    );
  else
    await pool.query(
      "INSERT INTO transactions (Amount, Date, Description, Name) VALUES (?, ?, ?, ?);",
      [
        transactionRow.Amount,
        transactionRow.Date,
        transactionRow.Description,
        transactionRow.Name,
      ]
    );
}

export async function selectAll(): Promise<TransactionRow[]> {
  const [rows] = await pool.query<TransactionRow[]>(
    "SELECT t.*, c.Name AS CategoryName FROM transactions t LEFT JOIN categories c ON t.CategoryId = c.CategoryId ORDER BY t.CreatedAt DESC;"
  );
  return rows;
}
