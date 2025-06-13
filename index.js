'use strict'

import { defineConfig } from 'eslint/config';

const useEffectComment = require('./rules/use-effect-comment');
const requireSuperagentExpect = require('./rules/require-superagent-expect');
const errorNaming = require('./rules/error-naming');

const allRules = {
  'use-effect-comment': useEffectComment,
  'require-superagent-expect': requireSuperagentExpect,
  'error-naming': errorNaming
};

export default {
  meta: {
    name: 'eslint-plugin-ferns',
    version: '1.2.3'
  },
  rules: allRules,
  configs: {
    recommended: defineConfig([
      {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
          ferns: {
            rules: allRules
          }
        },
        languageOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          parserOptions: {
            ecmaFeatures: {
              jsx: true
            }
          }
        },
        settings: {
          react: {
            version: 'detect'
          }
        },
        rules: {
          'ferns/use-effect-comment': 'error',
          'ferns/require-superagent-expect': 'error',
          'ferns/error-naming': 'error'
        }
      }
    ]),
    all: defineConfig([
      {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
          ferns: {
            rules: allRules
          }
        },
        rules: Object.fromEntries(
          Object.keys(allRules).map(rule => [`ferns/${rule}`, 'error'])
        )
      }
    ])
  }
};
