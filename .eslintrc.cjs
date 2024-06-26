// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  // overrides: [
  //   {
  //     extends: [
  //       "plugin:@typescript-eslint/recommended-requiring-type-checking",
  //     ],
  //     files: ["*.ts", "*.tsx"],
  //     parserOptions: {
  //       project: path.join(__dirname, "tsconfig.json"),
  //     },
  //   },
  // ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
    sourceType: "module"
  },
  // plugins: ["@typescript-eslint"],
  // extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-unsafe-assignment": "off",
    "consistent-type-imports": "off",
    "no-unused-vars": "off",
    "no-unsafe-return": "off",
    "no-unsafe-member-access": "off",
    "no-unsafe-call": "off",  
    "no-misused-promises": "off",
  },
};

module.exports = config;
