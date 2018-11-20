module.exports = {
  env: {
    node: true,
    browser: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
