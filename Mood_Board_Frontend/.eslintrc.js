module.exports = {
  extends: [ 'airbnb', 'eslint:recommended', 'plugin:jest/all' ],
  env: {
    browser: true,
    node: true,
    es6: true,
    'jest/globals': true
  },
  overrides: [
    {
      files: ['test/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'jest/expect-expect': 'off',
        'jest/no-disabled-tests': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/valid-title': 'off',
        'jest/no-interpolation-in-snapshots': 'off',
        'jest/no-export': 'off',
        'jest/prefer-expect-assertions': 'off'
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      // your babel options
      presets: ['@babel/preset-react']
    },
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [ 'react', 'jest' ],
  rules: {
    'no-unused-vars': 'warn',
    'no-var': 'error',
    indent: [ 'error', 2, { SwitchCase: 1 }],
    quotes: [ 'error', 'single' ],
    'react/jsx-props-no-spreading': 'off',
    'no-multi-spaces': 'error',
    'default-param-last': 'off',
    'jest/require-hook': 'off',
    'array-bracket-spacing': [
      'error',
      'always',
      {
        singleValue: false,
        objectsInArrays: false,
        arraysInArrays: false
      }
    ],
    'max-len': 'off',
    'linebreak-style': 'off',
    'block-spacing': [ 'error', 'always' ],
    'brace-style': [ 'error', '1tbs', { allowSingleLine: true }],
    'comma-dangle': [ 'error', 'never' ],
    'comma-spacing': [ 'error', { before: false, after: true }],
    'eol-last': [ 'error', 'always' ],
    'func-call-spacing': [ 'error', 'never' ],
    'key-spacing': [ 'error', { beforeColon: false }],
    'keyword-spacing': 'error',
    'no-console': [
      'warn',
      { allow: [ 'clear', 'info', 'error', 'dir', 'trace', 'log' ] }
    ],
    'no-multiple-empty-lines': [
      'error',
      { max: 1, maxEOF: 1, maxBOF: 0 }
    ],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error',
      'always',
      { arraysInObjects: true, objectsInObjects: true }
    ],
    semi: [ 'error', 'always' ],
    'semi-style': [ 'error', 'last' ],
    'space-before-blocks': 'error',
    'space-in-parens': [ 'error', 'never' ],
    'space-infix-ops': 'error',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/function-component-definition': 'off',
    'import/no-named-as-default': 0,
    'arrow-body-style': 'off',
    'jsx-a11y/anchor-is-valid': [
      'off',
      {
        components: ['Link'],
        specialLink: [ 'hrefLeft', 'hrefRight' ],
        aspects: [ 'noHref', 'invalidHref', 'preferButton' ]
      }
    ],
    'jsx-a11y/aria-role': [ 2, {
      allowedInvalidRoles: ['text'],
      ignoreNonDOM: true
    }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jest/expect-expect': 'error',
    'import/no-unresolved': 'off',
    'react/no-unstable-nested-components': 'off',
    'no-param-reassign': [ 'error', { props: false }],
    'react/jsx-no-useless-fragment': 'off',
    'jest/no-hooks': [
      'error',
      {
        allow: [ 'afterEach', 'afterAll', 'beforeEach' ]
      }
    ]
  },
  parser: '@babel/eslint-parser'
};
