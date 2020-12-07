module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['@sveltejs', 'prettier'],
  settings: {
    'svelte3/ignore-styles': attrs => attrs.lang === 'scss',
  },
  rules: {
    semi: ['error', 'always'],
    'spaced-comment': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false,
        ignoreComments: false,
      },
    ],
    curly: ['warn', 'all'],
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ],
    'no-constant-condition': 'off',
    'keyword-spacing': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-template-curly-in-string': 'warn',
    'block-spacing': ['error', 'always'],
    'comma-spacing': ['error', { before: false, after: true }],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'max-len': ['error', { code: 100 }],
    'no-tabs': 'error',
    'operator-assignment': ['error', 'always'],
    'object-curly-spacing': [
      'warn',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: true,
      },
    ],
    'key-spacing': 'error',
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'no-var': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false,
      },
    ],
    'yield-star-spacing': 'error',
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true,
        anonymous: 'neither',
        method: { before: true, after: false },
      },
    ],
    camelcase: 'warn',
    'import/no-unresolved': 'off',
  },
};
