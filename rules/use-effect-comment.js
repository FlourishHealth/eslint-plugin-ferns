/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'require a comment above all useEffect hooks',
      recommended: false,
      url: null // URL to the documentation page for this rule
    },
    messages: {
      missingComment: 'Expected a comment above the useEffect hook.'
    },
    schema: [], // no options
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.name === 'useEffect' ||
          (node.callee.type === 'MemberExpression' &&
            node.callee.property.name === 'useEffect')
        ) {
          const sourceCode = context.sourceCode;
          const commentsBefore = sourceCode.getCommentsBefore(node);

          // Check if there is at least one comment before the useEffect
          if (commentsBefore.length === 0) {
            context.report({
              node,
              messageId: 'missingComment'
            });
          }
        }
      }
    };
  }
};
