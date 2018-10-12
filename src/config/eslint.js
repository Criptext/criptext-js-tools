const ourUniversalRules = {
  eqeqeq: ['error', 'smart'],
  'no-else-return': 'error',
  'no-console': 'off',
  'no-unused-vars': ['error', { ignoreRestSiblings: true }],
  'prefer-const': 'error',
  'require-await': 'error',
  'fp/no-let': 'error',
  'fp/no-loops': 'error',
  'fp/no-mutation': ['error', { commonjs: true, allowThis: true }]
};

const copyExcept = (baseRules, exceptions) => {
  const copy = { ...baseRules };
  exceptions.forEach(excludedRule => {
    // eslint-disable-next-line fp/no-delete
    delete copy[excludedRule];
  });
  return copy;
};

const nodeJSBase = {
  extends: 'eslint:recommended',
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6
  },
  plugins: ['fp'],
  rules: ourUniversalRules
};

const frontendBase = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: ['fp', 'react'],
  rules: ourUniversalRules,
  settings: {
    react: {
      version: '16.0'
    }
  }
};

const nodeJSTests = {
  ...nodeJSBase,
  extends: ['eslint:recommended', 'plugin:jest/recommended'],
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jest: true
  },
  plugins: ['jest'],
  rules: copyExcept(ourUniversalRules, [
    'fp/no-let',
    'fp/no-loops',
    'fp/no-mutation'
  ])
};

const frontendTests = {
  ...frontendBase,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  plugins: ['jest'],
  rules: copyExcept(ourUniversalRules, [
    'fp/no-let',
    'fp/no-loops',
    'fp/no-mutation'
  ])
};

module.exports = {
  nodeJSBase,
  nodeJSTests,
  frontendBase,
  frontendTests
};
