const rule = require('../../../rules/use-effect-comment')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
})

ruleTester.run('require-comment-above-useeffect', rule, {
  valid: [
    // code examples that should pass
    `
    // This is a useEffect hook
    useEffect(() => {
      // Effect logic
    });
    `
  ],
  invalid: [
    // code examples that should fail
    {
      code: `
        useEffect(() => {
          // Effect logic
        });
      `,
      errors: [{ message: 'Expected a comment above the useEffect hook.' }]
    }
  ]
})
