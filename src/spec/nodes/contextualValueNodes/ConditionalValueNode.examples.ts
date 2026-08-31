import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a conditional value node from an input object',
        code(
            'typescript',
            `
const node = conditionalValueNode({
    condition: argumentValueNode('amount'),
    value: numberValueNode(0),
    ifTrue: accountValueNode('mint'),
    ifFalse: programIdValueNode(),
});
`,
        ),
    ),
    example(
        'An instruction account that defaults to another account if a condition is met',
        code(
            'typescript',
            `
instructionNode({
    name: 'transfer',
    accounts: [
        instructionAccountNode({
            name: 'source',
            isSigner: false,
            isWritable: true,
        }),
        instructionAccountNode({
            name: 'destination',
            isSigner: false,
            isWritable: true,
            isOptional: true,
            defaultValue: conditionalValueNode({
                condition: argumentValueNode('amount'),
                value: numberValueNode(0),
                ifTrue: accountValueNode('source'),
            }),
        }),
        // ...
    ],
    arguments: [
        instructionArgumentNode({
            name: 'amount',
            type: numberTypeNode('u64'),
        }),
    ],
});
`,
        ),
    ),
];
