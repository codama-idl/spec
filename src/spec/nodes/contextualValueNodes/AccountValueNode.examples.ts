import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an account value node from an account name',
        code(
            'typescript',
            `
const node = accountValueNode('mint');
`,
        ),
    ),
    example(
        'An instruction account defaulting to another account',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'mint',
    accounts: [
        instructionAccountNode({
            identifier: 'payer',
            isSigner: true,
            isWritable: false,
        }),
        instructionAccountNode({
            identifier: 'authority',
            isSigner: false,
            isWritable: true,
            defaultValue: accountValueNode('payer'),
        }),
        // ...
    ],
});
`,
        ),
    ),
];
