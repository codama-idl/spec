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
    name: 'mint',
    arguments: [
        instructionArgumentNode({
            name: 'amount',
            type: numberTypeNode('u64'),
        }),
        instructionArgumentNode({
            name: 'amountToDelegate',
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
