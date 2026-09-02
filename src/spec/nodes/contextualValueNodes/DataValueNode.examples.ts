import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a data value node from a path',
        code(
            'typescript',
            `
const node = dataValueNode('amount');
`,
        ),
    ),
    example(
        'Referencing a value nested within the instruction data',
        code(
            'typescript',
            `
dataValueNode('config.fees[0]');
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
            type: integerTypeNode('u64'),
        }),
        structFieldTypeNode({
            identifier: 'amountToDelegate',
            type: integerTypeNode('u64'),
            defaultValue: injectedValueNode({ key: 'amountToDelegate' }),
        }),
        // ...
    ]),
    provides: [providedNode('amountToDelegate', dataValueNode('amount'))],
});
`,
        ),
    ),
];
