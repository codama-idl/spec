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
        'A data field defaulting to the bump derivation of an instruction account',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'associatedTokenAccount',
            isSigner: false,
            isWritable: true,
        }),
        // ...
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'bump',
            type: integerTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'bump' }),
        }),
        // ...
    ]),
    provides: [providedNode('bump', accountBumpValueNode('associatedTokenAccount'))],
});
`,
        ),
    ),
];
