import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'A fixed-size account',
        code(
            'typescript',
            `
const node = accountNode({
    name: 'token',
    data: structTypeNode([
        structFieldTypeNode({ name: 'mint', type: publicKeyTypeNode() }),
        structFieldTypeNode({ name: 'owner', type: publicKeyTypeNode() }),
        structFieldTypeNode({ name: 'amount', type: numberTypeNode('u64') }),
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
    name: 'myProgram',
    accounts: [accountNode({ name: 'mint', data: definedTypeLinkNode('mintState') })],
    definedTypes: [
        definedTypeNode({
            name: 'mintState',
            type: structTypeNode([structFieldTypeNode({ name: 'supply', type: numberTypeNode('u64') })]),
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
    name: 'myProgram',
    accounts: [
        accountNode({
            name: 'token',
            data: structTypeNode([structFieldTypeNode({ name: 'authority', type: publicKeyTypeNode() })]),
            pda: pdaLinkNode('myPda'),
        }),
    ],
    pdas: [
        pdaNode({
            name: 'myPda',
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
