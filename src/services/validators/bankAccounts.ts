import { CreateAccountRequest } from "../types";

export function validateCreateBankAccount (createAccountRequest: CreateAccountRequest) {
    const { name } = createAccountRequest;

    if (!name) {
        throw new Error("Missing required fields with name 'name'.")
    }
}