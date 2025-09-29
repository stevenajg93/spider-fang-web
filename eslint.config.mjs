import js from "@eslint/js"
import tseslint from "typescript-eslint"
import importPlugin from "eslint-plugin-import"
import unusedImports from "eslint-plugin-unused-imports"

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Ignore build/artifact folders
  { ignores: ["**/.next/**", "**/node_modules/**", "**/dist/**", "**/build/**", "**/public/**"] },

  // Base JS + TS recommendations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // App/source files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
        typescript: true,
      },
    },
    rules: {
      "unused-imports/no-unused-imports": "warn",
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: [
            ["builtin", "external", "internal"],
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // Node-style config files (allow `module`, `require`, etc.)
  {
    files: [
      "**/*.{config.js,config.mjs,config.cjs}",
      "postcss.config.js",
      "tailwind.config.js",
      "next.config.mjs",
      "vitest.config.ts",
      "playwright.config.ts",
    ],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },
  },
  {
    files: ["app/admin/connected/page.tsx"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
]
