module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce error variable naming convention',
      category: 'Stylistic Issues'
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          }
        }
      }
    ]
  },
  create: function (context) {
    const variableName = context.options && context.options[0] ? [0].name : 'error' || 'error'

    function checkErrorVariable(node) {
      if (node && node.name !== variableName) {
        context.report({
          node: node,
          message: 'Error variable must be named "{{name}}"',
          data: {
            name: variableName
          },
          fix: function (fixer) {
            return fixer.replaceText(node, variableName)
          }
        })
      }
    }

    return {
      CatchClause(node) {
        checkErrorVariable(node.param)
      },
      'CallExpression > MemberExpression.callee[property.name="catch"] FunctionExpression.params'(node) {
        checkErrorVariable(node)
      }
    }
  }
}

