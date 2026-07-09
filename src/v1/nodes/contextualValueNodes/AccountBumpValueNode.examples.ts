import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an account bump value node from an account name',
        code(
            'typescript',
            `
const node = accountBumpValueNode('associatedTokenAccount');
`,
        ),
    ),
    example(
        'An instruction argument defaulting to the bump derivation of an instruction account',
        code(
            'typescript',
            `
instructionNode({
    name: 'transfer',
    accounts: [
        instructionAccountNode({
            name: 'associatedTokenAccount',
            isSigner: false,
            isWritable: true,
        }),
        // ...
    ],
    arguments: [
        instructionArgumentNode({
            name: 'bump',
            type: numberTypeNode('u8'),
            defaultValue: accountBumpValueNode('associatedTokenAccount'),
        }),
        // ...
    ],
});
`,
        ),
    ),
];
