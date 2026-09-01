import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an argument value node from a path',
        code(
            'typescript',
            `
const node = argumentValueNode('amount');
`,
        ),
    ),
    example(
        'Referencing a value nested within the instruction data',
        code(
            'typescript',
            `
argumentValueNode('config.fees[0]');
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
