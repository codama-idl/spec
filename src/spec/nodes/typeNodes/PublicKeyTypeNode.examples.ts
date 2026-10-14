import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a public key type node',
        code(
            'typescript',
            `
const node = publicKeyTypeNode();
`,
        ),
    ),
    example(
        'A public key linked to the account it points to',
        code(
            'typescript',
            `
// A token account stores the address of its mint.
accountNode({
    identifier: 'token',
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'mint',
            type: publicKeyTypeNode({ accountLink: accountLinkNode('mint') }),
        }),
        // ...
    ]),
});

// An instruction account linked to a token account...
instructionAccountNode({
    identifier: 'inputTokenAccount',
    isSigner: false,
    isWritable: true,
    accountLink: accountLinkNode('token'),
});

// ...lets paths follow its mint address into the mint's data, through a data segment.
providedNode('decimals', accountDataValueNode('inputTokenAccount', 'mint.data.decimals'));
`,
        ),
    ),
];
