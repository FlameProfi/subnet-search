// Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
// The file does not match your project config: .eslintrc.js.
// The file must be included in at least one of the projects provided.eslint

module.exports = {
  root: true,
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 'off',
    'prettier/prettier': 2,
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
};
