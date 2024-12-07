export interface RequiredFieldNotDefined extends Error {
  name: "RequiredFieldNotDefined";
  fieldName: string;
}
