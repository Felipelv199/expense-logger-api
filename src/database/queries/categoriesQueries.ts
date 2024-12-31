import { ResultSetHeader, RowDataPacket } from "mysql2";
import { createPool } from "..";
import { CategoryRow } from "../types";

const pool = createPool();

export async function findById(id: number): Promise<RowDataPacket | undefined> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM categories WHERE categoryId = ?;",
    [id]
  );
  return rows[0];
}

export async function findByName(
  name: string
): Promise<RowDataPacket | undefined> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM categories WHERE name = ?;",
    [name]
  );
  return rows[0];
}

export async function insert(categoryRow: CategoryRow): Promise<number | undefined> {
  if (!categoryRow.budgetId) {
    const [result] = await pool.query("INSERT INTO categories (Amount, Name) VALUES (?, ?);", [
      categoryRow.amount,
      categoryRow.name,
    ]);
    return (result as ResultSetHeader).insertId;
  } else {
    const [result] = await pool.query(
      "INSERT INTO categories (Amount, BudgetId, Name) VALUES (?, ?, ?);",
      [categoryRow.amount, categoryRow.budgetId, categoryRow.name]
    );
    return (result as ResultSetHeader).insertId;
  }
}

export async function selectAll(): Promise<CategoryRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM categories;");
  return rows.map((r) => {
    const rowValues = Object.values(r);
    return {
      amount: rowValues[3],
      budgetId: rowValues[1],
      categoryId: rowValues[0],
      name: rowValues[2],
    };
  });
}
