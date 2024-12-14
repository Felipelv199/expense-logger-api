import { createPool } from "..";
import { RowDataPacket } from "mysql2";

const pool = createPool();

export async function findByBudgetId(budgetId: number) {
  return await pool.query<RowDataPacket[]>(
    "SELECT * FROM budgets WHERE BudgetId = ?",
    [budgetId]
  );
}
