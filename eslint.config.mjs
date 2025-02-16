import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier/recommended";
import sortKeysPlugin from "eslint-plugin-sort-keys-fix";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  prettier,
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
      "prettier/prettier": ["error", { endOfLine: "auto" }], // This will auto-detect and preserve the line endings
      "sort-keys-fix/sort-keys-fix": ["error", "asc", { natural: true }],
    },
  },
  ...tseslint.configs.recommended,
];
