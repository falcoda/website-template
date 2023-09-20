module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "simple-import-sort",
    "unused-imports",
    "prettier",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        useTabs: false,
      },
    ],
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "unused-imports/no-unused-imports": "error",
    "object-curly-spacing": ["error", "always"],
    "linebreak-style": ["error", "windows"],
    semi: ["error", "always"],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
