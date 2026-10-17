import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import { globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";
import pluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const allLayersBelowApp = [
  "pages",
  "widgets",
  "features",
  "entities",
  "shared",
];

/**
 * @type {import("eslint").Linter.Config[]}
 * */
const eslintConfig = [
  globalIgnores([
    "node_modules/",
    "dist/",
    ".next/",
    ".git/",
    ".github/",
    ".vscode/",
    "coverage/",
    "public/",
    "next-env.d.ts",
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.{js,mjs,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          warnOnUnassignedImports: true,
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index", "object"],
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  // Feature-Sliced Design import rules (see ARCHITECTURE.md)
  {
    files: ["app/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true },
      },
      "boundaries/include": ["app/**/*", "src/**/*"],
      "boundaries/elements": [
        { type: "next-app", pattern: "app/**/*", mode: "full" },
        { type: "app", pattern: "src/app/**/*", mode: "full" },
        { type: "pages", pattern: "src/pages_/*", mode: "folder" },
        { type: "widgets", pattern: "src/widgets/*", mode: "folder" },
        { type: "features", pattern: "src/features/*", mode: "folder" },
        { type: "entities", pattern: "src/entities/*", mode: "folder" },
        { type: "shared", pattern: "src/shared/**/*", mode: "full" },
      ],
    },
    rules: {
      // Anything not listed in `allow` is an error. Importing from another
      // slice of the same layer is therefore an error too (no cross-slice imports).
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "next-app", allow: ["app", ...allLayersBelowApp] },
            { from: "app", allow: ["app", ...allLayersBelowApp] },
            {
              from: "pages",
              allow: ["widgets", "features", "entities", "shared"],
            },
            { from: "widgets", allow: ["features", "entities", "shared"] },
            { from: "features", allow: ["entities", "shared"] },
            { from: "entities", allow: ["shared"] },
            // Exception: type-only imports between entities
            { from: "entities", allow: ["entities"], importKind: "type" },
            // Cross-folder imports inside shared are allowed
            { from: "shared", allow: ["shared"] },
          ],
        },
      ],
    },
  },

  eslintConfigPrettier,
];

export default eslintConfig;
