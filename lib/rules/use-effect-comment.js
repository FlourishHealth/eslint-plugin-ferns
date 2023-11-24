module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'require a comment above all useEffect hooks',
      category: 'Best Practices',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: []
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.name === 'useEffect' ||
                    (node.callee.type === 'MemberExpression' &&
                        node.callee.property.name === 'useEffect')
        ) {
          const sourceCode = context.getSourceCode()
          const commentsBefore = sourceCode.getCommentsBefore(node)

          // Check if there is at least one comment before the useEffect
          if (commentsBefore.length === 0) {
            context.report({
              node,
              message: 'Expected a comment above the useEffect hook.'
            })
          }
        }
      }
    }
  }
}
