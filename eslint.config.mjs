import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import sortKeysPlugin from "eslint-plugin-sort-keys-fix";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: { import: importPlugin, "sort-keys-fix": sortKeysPlugin },
    rules: {
      "func-style": ["error", "declaration"],
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
      "sort-keys-fix/sort-keys-fix": ["error", "asc", { natural: true }],
    },
    ...eslintPluginPrettierRecommended,
  },
  ...tseslint.configs.recommended,
];
