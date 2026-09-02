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
        'An instruction data field defaulting to another field',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'mint',
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'amount',
            type: numberTypeNode('u64'),
        }),
        structFieldTypeNode({
            identifier: 'amountToDelegate',
            type: numberTypeNode('u64'),
            defaultValue: injectedValueNode({ key: 'amountToDelegate' }),
        }),
        // ...
    ]),
    provides: [providedNode('amountToDelegate', argumentValueNode('amount'))],
});
`,
        ),
    ),
];
