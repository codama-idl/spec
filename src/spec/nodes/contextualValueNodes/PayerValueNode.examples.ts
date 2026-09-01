import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a payer value node',
        code(
            'typescript',
            `
const node = payerValueNode();
`,
        ),
    ),
    example(
        'An instruction account defaulting to the payer value',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'payer',
            isSigner: true,
            isWritable: false,
            defaultValue: payerValueNode(),
        }),
        // ...
    ],
});
`,
        ),
    ),
];
