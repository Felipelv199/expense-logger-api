import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import sortKeysPlugin from "eslint-plugin-sort-keys-fix";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: { "sort-keys-fix": sortKeysPlugin },
    rules: {
      "func-style": ["error", "declaration"],
      "sort-keys-fix/sort-keys-fix": ["error", "asc", { natural: true }],
    },
  },
  ...tseslint.configs.recommended,
];
