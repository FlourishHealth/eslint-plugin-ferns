import standard from 'eslint-config-standard';

export default [
  {
    ...standard,
    rules: {
      'space-before-function-paren': 'off'
    },
    ignores: ['**/node_modules/**']
  }
]; 