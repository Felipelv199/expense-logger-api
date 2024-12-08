import { on } from "events";
import { createPool } from "..";
import { AccountRow } from "../types";
import { RowDataPacket } from "mysql2";

const pool = createPool();

export const insert = async (accountValues: unknown[]) =>
  await pool.query(
    "INSERT INTO accounts (AccountName) VALUES (?)",
    accountValues
  );

export const selectAll = async (): Promise<AccountRow[]> => {
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
};
