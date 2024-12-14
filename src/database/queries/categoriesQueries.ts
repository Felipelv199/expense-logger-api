import { RowDataPacket } from "mysql2";
import { createPool } from "..";
import { CategoryRow } from "../types";

const pool = createPool();

export async function insert(categoryValues: unknown[]) {
  await pool.query(
    "INSERT INTO categories (Amount, BudgetId, Name) VALUES (?, ?, ?);",
    categoryValues
  );
}

export async function selectAll(): Promise<CategoryRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM categories;");
  return rows.map((r) => {
    const rowValues = Object.values(r);
    return {
      categoryId: rowValues[0],
      budgetId: rowValues[1],
      name: rowValues[2],
      amount: rowValues[3],
    };
  });
}
