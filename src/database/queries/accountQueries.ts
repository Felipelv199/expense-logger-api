import { createPool } from "..";
import { AccountRow } from "../types";
import { RowDataPacket } from "mysql2";

const pool = createPool();

export async function insert(accountValues: unknown[]) {
  await pool.query(
    "INSERT INTO accounts (AccountName) VALUES (?)",
    accountValues
  );
}

export async function selectAll(): Promise<AccountRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM accounts");

  return rows.map<AccountRow>((r) => {
    const rowValues = Object.values(r);

    return {
      accountId: rowValues[0],
      accountName: rowValues[1],
      createdAt: rowValues[2],
      updatedAt: rowValues[3],
    };
  });
}
