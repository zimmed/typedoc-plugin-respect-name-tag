module.exports = {
  root: true,
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  env: {
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true, jsx: false },
  },
  rules: {
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'no-shadow': [
      2,
      {
        allow: ['_'],
      },
    ],
    'ordered-imports': 0,
    'object-literal-sort-keys': 0,
    'no-this-assignment': 0,
    'no-param-reassign': [2, { props: false }],
    'no-await-in-loop': 0,
    'class-methods-use-this': 0,
    'node/no-missing-import': 0,
    'no-unused-vars': 1,
    'no-nested-ternary': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
};
