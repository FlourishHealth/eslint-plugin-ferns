module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "ensure every superagent call has an expect call at the end",
            category: "Best Practices",
            recommended: false
        },
        fixable: null,
        schema: [] // no options
    },
    create: function(context) {
        let superagentVariables = new Map(); // Track variables assigned from superagent calls

        return {
            // Capture superagent calls in async/await context
            AwaitExpression(node) {
                if (node.argument.type === 'CallExpression' &&
                    node.argument.callee.type === 'MemberExpression' &&
                    node.argument.callee.object.name === 'familyMember2Agent') {

                    let parent = node.parent;
                    if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier') {
                        // Store the variable name
                        superagentVariables.set(parent.id.name, node.argument);
                    }
                }
            },
            // Check each CallExpression for expect usage with stored variables
            CallExpression(node) {
                if (node.callee.name === 'expect' && node.arguments.length > 0) {
                    let arg = node.arguments[0];
                    if (arg.type === 'Identifier' && superagentVariables.has(arg.name)) {
                        superagentVariables.delete(arg.name); // Found a matching expect call
                    }
                }
            },
            'Program:exit'() {
                // At the end of the program, check for any superagent calls without matching expect calls
                superagentVariables.forEach((value, key) => {
                    context.report({
                        node: value,
                        message: `The superagent call assigned to '${key}' must be followed by an expect call.`
                    });
                });
            }
        };
    }
};

