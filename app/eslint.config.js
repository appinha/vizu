import js from "@eslint/js";
import globals from "globals";
import eslintComments from "eslint-plugin-eslint-comments";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import vitest from "@vitest/eslint-plugin";
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      prettierRecommended, // this needs to be last so that eslint-config-prettier has the opportunity to override other configs
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: { ecmaFeatures: { jsx: true } },
      ...react.configs.flat.recommended.languageOptions,
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      "eslint-comments": eslintComments,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...eslintComments.configs.recommended.rules,
      "eslint-comments/require-description": "error",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      ...reactHooks.configs.recommended.rules,
      "react/no-array-index-key": "error",
      "react/no-unused-prop-types": "error",
      "react/self-closing-comp": "error",
      "react/jsx-no-leaked-render": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-curly-brace-presence": "error",
      "react/jsx-boolean-value": "error",
      "react/jsx-no-constructed-context-values": "error",
      "react/jsx-no-bind": "error",
      "react/function-component-definition": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["**/*.test.tsx", "**/*.test.ts"],
    plugins: { vitest },
    rules: { ...vitest.configs.recommended.rules },
  },
  {
    files: ["**/*.test.tsx", "**/*.test.ts"],
    ...testingLibrary.configs["flat/react"],
  },
  {
    files: ["**/*.test.tsx", "**/*.test.ts"],
    ...jestDom.configs["flat/recommended"],
  },
);
