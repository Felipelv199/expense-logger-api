import { AccountRow } from "../database/types";
import { BankAccount, CreateBankAccountRequest } from "../services/types";

export function mapAccountRowToBankAccount(
  accountRow: AccountRow,
): BankAccount {
  return {
    id: accountRow.accountId,
    name: accountRow.accountName,
  };
}

export function mapCreateBankAccountRequestToAccountRow(
  createBankAccountRequest: CreateBankAccountRequest,
): AccountRow {
  return {
    accountName: createBankAccountRequest.name,
  } as AccountRow;
}
