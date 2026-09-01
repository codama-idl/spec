import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an argument value node from an argument name',
        code(
            'typescript',
            `
const node = argumentValueNode('amount');
`,
        ),
    ),
    example(
        'An instruction argument defaulting to another argument',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'mint',
    arguments: [
        instructionArgumentNode({
            identifier: 'amount',
            type: numberTypeNode('u64'),
        }),
        instructionArgumentNode({
            identifier: 'amountToDelegate',
            type: numberTypeNode('u64'),
            defaultValue: argumentValueNode('amount'),
        }),
        // ...
    ],
});
`,
        ),
    ),
];
