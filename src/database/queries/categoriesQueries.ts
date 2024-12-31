import { ResultSetHeader } from "mysql2";

import { createPool } from "..";
import { CategoryRow } from "../types";

const pool = createPool();

export async function findById(id: number): Promise<CategoryRow | undefined> {
  const [rows] = await pool.query<CategoryRow[]>(
    "SELECT * FROM categories WHERE categoryId = ?;",
    [id],
  );
  return rows[0];
}

export async function findByName(
  name: string,
): Promise<CategoryRow | undefined> {
  const [rows] = await pool.query<CategoryRow[]>(
    "SELECT * FROM categories WHERE name = ?;",
    [name],
  );
  return rows[0];
}

export async function insert(
  categoryRow: CategoryRow,
): Promise<number | undefined> {
  if (!categoryRow.budgetId) {
    const [result] = await pool.query(
      "INSERT INTO categories (Amount, Name) VALUES (?, ?);",
      [categoryRow.amount, categoryRow.name],
    );
    return (result as ResultSetHeader).insertId;
  } else {
    const [result] = await pool.query(
      "INSERT INTO categories (Amount, BudgetId, Name) VALUES (?, ?, ?);",
      [categoryRow.amount, categoryRow.budgetId, categoryRow.name],
    );
    return (result as ResultSetHeader).insertId;
  }
}

export async function selectAll(): Promise<CategoryRow[]> {
  const [rows] = await pool.query<CategoryRow[]>("SELECT * FROM categories;");
  return rows;
}
