import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an identity value node',
        code(
            'typescript',
            `
const node = identityValueNode();
`,
        ),
    ),
    example(
        'An instruction account defaulting to the identity value',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'authority',
            isSigner: true,
            isWritable: false,
            defaultValue: identityValueNode(),
        }),
        // ...
    ],
});
`,
        ),
    ),
];
