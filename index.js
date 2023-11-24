'use strict'

const allRules = {
  'use-effect-comment': require('./lib/rules/use-effect-comment')
}

function configureAsError(rules) {
  var result = {}
  for (var key in rules) {
    if (!rules.hasOwnProperty(key)) {
      continue
    }
    result['ferns/' + key] = 2
  }
  return result
}

module.exports = {
  rules: allRules,
  configs: {
    recommended: {
      plugins: ['ferns'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'ferns/use-effect-comment': 2
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
