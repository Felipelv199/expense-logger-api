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
    "select t.*, c.Name as CategoryName from transactions t left join categories c on t.CategoryId = c.CategoryId order by t.CreatedAt desc;"
  );
  return rows;
}
