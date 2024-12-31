import { createPool } from "..";
import { AccountRow } from "../types";

const pool = createPool();

export async function insert(accountRow: AccountRow) {
  await pool.query("INSERT INTO accounts (AccountName) VALUES (?);", [
    accountRow.accountName,
  ]);
}

export async function selectAll(): Promise<AccountRow[]> {
  const [rows] = await pool.query<AccountRow[]>("SELECT * FROM accounts;");
  return rows;
}
