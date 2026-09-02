import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'A fixed-size account',
        code(
            'typescript',
            `
const node = accountNode({
    identifier: 'token',
    data: structTypeNode([
        structFieldTypeNode({ identifier: 'mint', type: publicKeyTypeNode() }),
        structFieldTypeNode({ identifier: 'owner', type: publicKeyTypeNode() }),
        structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u64') }),
    ]),
    discriminators: [sizeDiscriminatorNode(72)],
    size: 72,
});
`,
        ),
    ),
    example(
        'An account reusing a defined type as its data',
        code(
            'typescript',
            `
programNode({
    identifier: 'myProgram',
    accounts: [accountNode({ identifier: 'mint', data: definedTypeLinkNode('mintState') })],
    definedTypes: [
        definedTypeNode({
            identifier: 'mintState',
            type: structTypeNode([structFieldTypeNode({ identifier: 'supply', type: integerTypeNode('u64') })]),
        }),
    ],
});
`,
        ),
    ),
    example(
        'An account with a linked PDA',
        code(
            'typescript',
            `
programNode({
    identifier: 'myProgram',
    accounts: [
        accountNode({
            identifier: 'token',
            data: structTypeNode([structFieldTypeNode({ identifier: 'authority', type: publicKeyTypeNode() })]),
            pda: pdaLinkNode('myPda'),
        }),
    ],
    pdas: [
        pdaNode({
            identifier: 'myPda',
            seeds: [
                constantPdaSeedNodeFromString('utf8', 'token'),
                variablePdaSeedNode('authority', publicKeyTypeNode()),
            ],
        }),
    ],
});
`,
        ),
    ),
];
