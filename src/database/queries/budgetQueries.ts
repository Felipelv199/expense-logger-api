import { RowDataPacket } from "mysql2";

import { createPool } from "..";

const pool = createPool();

export async function findByBudgetId(budgetId: number) {
  return await pool.query<RowDataPacket[]>(
    "SELECT * FROM budgets WHERE BudgetId = ?",
    [budgetId],
  );
}
