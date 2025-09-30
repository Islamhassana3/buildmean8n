import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import stylisticPlugin from "@stylistic/eslint-plugin";
import unicornPlugin from "eslint-plugin-unicorn";
import importPlugin from "eslint-plugin-import-x";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";

const tsAndJsRules = {
	"no-unused-vars": "off",
	"@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
	"@typescript-eslint/consistent-type-imports": "error",
	"@typescript-eslint/consistent-type-exports": "error",
	"@typescript-eslint/array-type": ["error", { default: "array-simple" }],
	"@typescript-eslint/await-thenable": "error",
	"@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": true }],
	"@typescript-eslint/no-restricted-types": [
		"error",
		{
			types: {
				Object: {
					message: "Use object instead",
					fixWith: "object",
				},
				String: {
					message: "Use string instead",
					fixWith: "string",
				},
				Boolean: {
					message: "Use boolean instead",
					fixWith: "boolean",
				},
				Number: {
					message: "Use number instead",
					fixWith: "number",
				},
			},
		},
	],
	"@typescript-eslint/no-void": ["error", { allowAsStatement: true }],
	"@typescript-eslint/member-delimiter-style": [
		"error",
		{
			multiline: {
				delimiter: "semi",
				requireLast: true,
			},
			singleline: {
				delimiter: "semi",
				requireLast: false,
			},
		},
	],
	"@stylistic/indent": "off", // Delegated to Prettier
	"no-constant-binary-expression": "error",
	"sort-imports": "off",
	"import/order": [
		"error",
		{
			"groups": [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
			"newlines-between": "always",
			"alphabetize": { "order": "asc", "caseInsensitive": true }
		}
	],
	"unused-imports/no-unused-imports": "error",
	"unicorn/no-unnecessary-await": "error",
	"unicorn/no-useless-promise-resolve-reject": "error",
	"unicorn/filename-case": ["error", { case: "kebabCase" }],
};

export default [
  {
    ignores: ["dist/**", "legacy/**", "node_modules/**"]
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@stylistic": stylisticPlugin,
      unicorn: unicornPlugin,
      "unused-imports": unusedImportsPlugin,
      import: importPlugin
    },
    rules: {
      ...tsPlugin.configs["recommended"].rules,
      ...tsAndJsRules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/anchor-is-valid": "warn"
    },
    settings: {
      react: {
        version: "detect"
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.base.json"
        }
      }
    }
  },
  eslintConfigPrettier
];
