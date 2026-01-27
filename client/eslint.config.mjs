import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,vue}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      "no-debugger": "warn",
    },
  },
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
    rules: {
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "vue/require-v-for-key": "warn",
      "vue/block-order": [
        "warn",
        {
          order: [["script", "template"], "style"],
        },
      ],
      "vue/component-api-style": ["warn", ["script-setup", "composition"]],
    },
  },
  {
    files: ["**/utils/Logger.ts"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
