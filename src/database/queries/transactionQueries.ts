import { RowDataPacket } from "mysql2";
import { createPool } from "..";
import { TransactionRow } from "../types";

const pool = createPool();

export async function insert(transactionValues: unknown[]) {
  await pool.query(
    "INSERT INTO transactions (Amount, Date, Description, Name) VALUES (?, ?, ?);",
    transactionValues
  );
}

export async function selectAll(): Promise<TransactionRow[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM transactions;"
  );
  return rows.map((r) => {
    const rowValues = Object.values(r);
    return {
      transactionId: rowValues[0],
      name: rowValues[1],
      date: rowValues[2],
      amount: rowValues[3],
      accountId: rowValues[4],
      description: rowValues[5],
      transactionTypeId: rowValues[6],
      createdAt: rowValues[7],
      updatedAt: rowValues[8],
    };
  });
}
