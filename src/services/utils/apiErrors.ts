import { RequiredFieldNotDefined } from "../types/errors";

export function getRequiredFieldNotDefinedError(
  fieldName: string
): RequiredFieldNotDefined {
  return {
    fieldName,
    message: "Missing required field.",
    name: "RequiredFieldNotDefined",
  };
}
