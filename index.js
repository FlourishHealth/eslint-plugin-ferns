'use strict'

const allRules = {
  'use-effect-comment': require('./rules/use-effect-comment'),
  'require-superagent-expect': require('./rules/require-superagent-expect'),
  'error-naming': require('./rules/error-naming')
}

function configureAsError(rules) {
  const result = {}
  for (const key in rules) {
    if (!Object.prototype.hasOwnProperty.call(rules, key)) {
      continue
    }
    result['ferns/' + key] = 2
  }
  return result
}

module.exports = {
  meta: {
    name: 'eslint-plugin-ferns',
    version: '1.2.3'
  },
  rules: allRules,
  configs: {
    recommended: {
      settings: {
        react: {
          version: 'detect'
        }
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
      },
      env: {
        'react-native/react-native': true
      },
      plugins: [
        'import',
        'prettier',
        'lodash',
        'simple-import-sort',
        'unused-imports',
        'react',
        'react-native',
        'react-hooks',
        'react-perf',
        '@typescript-eslint',
        'comment-length',
        'ferns'
      ],
      extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:prettier/recommended'
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-require': 'off',
        // Intelligently sort imports and exports
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',

        // Just disable console.log.
        'no-console': [
          'error',
          { allow: ['trace', 'debug', 'info', 'warn', 'error'] }
        ],

        // Prevent importing all of lodash. This lowers bundle size greatly.
        'lodash/import-scope': [2, 'method'],

        // Run prettier's error checking.
        'prettier/prettier': 'error',

        /*  General Readability */

        // disallow declaration of variables already declared in the outer scope
        // NOTE: no-shadow fails with Typescript enums, so we have to use the TS version.
        '@typescript-eslint/no-shadow': 'error',
        'no-shadow': 'off',

        // disallow shadowing of names such as arguments
        'no-shadow-restricted-names': 'error',

        // disallow use of undefined when initializing variables
        'no-undef-init': 'error',

        /* Style */

        // enforce newline at the end of file, with no multiple empty lines
        'eol-last': ['error', 'always'],

        // require or disallow an empty line between class members
        // https://eslint.org/docs/rules/lines-between-class-members
        'lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: false }
        ],

        // disallow whitespace before properties
        // https://eslint.org/docs/rules/no-whitespace-before-property
        'no-whitespace-before-property': 'off',

        // require or disallow a space immediately following the // or /* in a comment
        // https://eslint.org/docs/rules/spaced-comment
        'spaced-comment': [
          'error',
          'always',
          {
            line: {
              exceptions: ['-', '+'],
              markers: ['=', '!', '/'] // space here to support sprockets directives, slash for TS /// comments
            },
            block: {
              exceptions: ['-', '+'],
              markers: ['=', '!', ':', '::'], // space here to support sprockets directives and flow comment types
              balanced: true
            }
          }
        ],

        // require parens in arrow function arguments
        // https://eslint.org/docs/rules/arrow-parens
        'arrow-parens': ['error', 'always'],

        // Disallow multiple imports from the same module.
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
        'import/no-duplicates': ['error'],

        // disallow useless computed property keys
        // https://eslint.org/docs/rules/no-useless-computed-key
        'no-useless-computed-key': 'error',

        // require let or const instead of var
        'no-var': 'error',

        'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_'
          }
        ],

        // require method and property shorthand syntax for object literals
        // https://eslint.org/docs/rules/object-shorthand
        'object-shorthand': [
          'error',
          'always',
          {
            ignoreConstructors: false,
            avoidQuotes: true
          }
        ],

        // suggest using of const declaration for variables that are never modified after declared
        'prefer-const': [
          'error',
          {
            destructuring: 'any',
            ignoreReadBeforeAssign: true
          }
        ],

        // suggest using template literals instead of string concatenation
        // https://eslint.org/docs/rules/prefer-template
        'prefer-template': 'error',

        // enforce spacing between object rest-spread
        // https://eslint.org/docs/rules/rest-spread-spacing
        'rest-spread-spacing': ['error', 'never'],

        // remove extra spacing in template strings
        // https://eslint.org/docs/rules/template-curly-spacing
        'template-curly-spacing': 'off',

        // encourages use of dot notation whenever possible
        // https://eslint.org/docs/rules/dot-notation
        'dot-notation': ['error', { allowKeywords: true }],

        // require the use of === and !==
        // https://eslint.org/docs/rules/eqeqeq
        eqeqeq: ['error', 'always', { null: 'ignore' }],

        // require or disallow Yoda conditions
        // https://eslint.org/docs/rules/yoda
        yoda: 'error',

        /* React */

        // Standardize how function components are declared (which is fixable, sweet).
        'react/function-component-definition': [
          'error',
          { namedComponents: 'arrow-function' }
        ],

        'react/no-arrow-function-lifecycle': 'error',

        // Catch insidious bugs where you directly modify this.state.
        'react/no-direct-mutation-state': 'error',

        // Detect unescaped HTML entities, which might represent malformed tags
        'react/no-unescaped-entities': 'error',

        'react/self-closing-comp': 'error',

        'react/jsx-boolean-value': 'error',

        // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-closing-bracket-location.md
        'react/jsx-closing-bracket-location': 'error',

        // Avoid unnecessary curly braces
        // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-curly-brace-presence.md
        // TODO propElementValues: "always" causes an error.
        'react/jsx-curly-brace-presence': [
          'error',
          { props: 'never', children: 'never' }
        ],

        'react/jsx-curly-newline': [
          'error',
          {
            multiline: 'consistent',
            singleline: 'consistent'
          }
        ],

        'react/jsx-curly-spacing': ['error', { when: 'never' }],

        'react/jsx-equals-spacing': ['error', 'never'],

        'react/jsx-fragments': ['error', 'syntax'],

        // Indent JSX children 2 spaces
        // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-indent.md
        'react/jsx-indent': ['error', 2],

        // Indent JSX props 2 spaces when new lines are required.
        // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': ['error', 2],

        // Report missing key in iterators
        // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-key.md
        'react/jsx-key': 'error',

        // Prevent multiple JSX expressions on a single line, except for a single child.
        // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-one-expression-per-line.md
        // "react/jsx-one-expression-per-line": ["error", { "allow": "single-child"}],

        // Disable unnecessary fragments
        // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-no-useless-fragment.md
        'react/jsx-no-useless-fragment': 'error',

        'react/jsx-sort-props': [
          'error',
          {
            callbacksLast: true,
            ignoreCase: false,
            reservedFirst: true
          }
        ],

        // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-tag-spacing.md
        'react/jsx-tag-spacing': [
          'error',
          {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never'
          }
        ],

        // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-wrap-multilines.md
        'react/jsx-wrap-multilines': [
          'error',
          {
            declaration: 'parens',
            assignment: 'parens',
            return: 'parens',
            arrow: 'parens',
            condition: 'ignore',
            logical: 'ignore',
            prop: 'ignore'
          }
        ],

        /* React Native */
        'react-native/no-unused-styles': 'error',

        'react-native/split-platform-components': 'off',

        // Encourage simpler, inline styles over Stylesheets. Most style should be encapsulated in components rather than
        // style sheets or styled-components.
        'react-native/no-inline-styles': 'off',

        'react-native/no-color-literals': 'off',

        // Text covers both our new Text component and the original, our Link component, and our Heading component.
        'react-native/no-raw-text': [
          2,
          {
            skip: ['Text', 'Link', 'Heading']
          }
        ],

        'react-native/no-single-element-style-arrays': 2,

        /* React Hooks */
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
        'no-constant-binary-expression': 'error', // Checks for logic errors in boolean expressions, see https://eslint.org/blog/2022/07/interesting-bugs-caught-by-no-constant-binary-expression/

        /* Use named exports wherever possible */
        'import/no-default-export': 'error',

        /* Enforce performance best practices (not enabled yed) */
        'react-perf/jsx-no-new-object-as-prop': 'off',
        'react-perf/jsx-no-new-array-as-prop': 'off',
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'react-perf/jsx-no-jsx-as-prop': 'off',

        /* Enforce max comment lengths */
        'comment-length/limit-single-line-comments': [
          'warn',
          {
            mode: 'compact-on-overflow',
            maxLength: 100,
            logicalWrap: true,
            ignoreUrls: true,
            ignoreCommentsWithCode: true,
            tabSize: 2
          }
        ],
        'comment-length/limit-multi-line-comments': [
          'warn',
          {
            mode: 'compact-on-overflow',
            maxLength: 100,
            logicalWrap: true,
            ignoreUrls: true,
            ignoreCommentsWithCode: true,
            tabSize: 2
          }
        ],

        'ferns/use-effect-comment': 'error',
        'ferns/require-superagent-expect': 'error',
        'ferns/error-naming': 'error'
      }
    },
    all: {
      plugins: ['ferns'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: configureAsError(allRules)
    }
  }
}
