import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'An instruction with a u8 discriminator',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'increment',
    accounts: [
        instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: false }),
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'discriminator',
            type: integerTypeNode('u8'),
            defaultValue: integerValueNode('42'),
            defaultValueStrategy: 'omitted',
        }),
    ]),
});
`,
        ),
    ),
    example(
        'An instruction providing a contextual default',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'createAccount',
    accounts: [
        instructionAccountNode({ identifier: 'payer', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'newAccount', isWritable: true, isSigner: true }),
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'bump',
            type: integerTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'bump' }),
        }),
    ]),
    provides: [providedNode('bump', accountBumpValueNode('newAccount'))],
});
`,
        ),
    ),
    example(
        'An instruction that creates a new account',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'createCounter',
    accounts: [
        instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: false }),
    ],
    byteDeltas: [instructionByteDeltaNode(accountLinkNode('counter'))],
});
`,
        ),
    ),
    example(
        'An instruction with omitted optional accounts',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'initialize',
    accounts: [
        instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: false }),
        instructionAccountNode({ identifier: 'freezeAuthority', isWritable: false, isSigner: false, isOptional: true }),
    ],
    optionalAccountStrategy: 'omitted',
});
`,
        ),
    ),
    example(
        'An instruction with remaining signers',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'multisigIncrement',
    accounts: [instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: false })],
    remainingAccounts: [instructionRemainingAccountsNode('authorities', { isSigner: true })],
});
`,
        ),
    ),
    example(
        'An instruction with nested versioned instructions',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'increment',
    accounts: [
        instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: 'either' }),
        instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: true }),
    ],
    data: structTypeNode([
        structFieldTypeNode({ identifier: 'version', type: integerTypeNode('u8') }),
        structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u8') }),
    ]),
    subInstructions: [
        instructionNode({
            identifier: 'incrementV1',
            accounts: [instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: true })],
            data: structTypeNode([
                structFieldTypeNode({
                    identifier: 'version',
                    type: integerTypeNode('u8'),
                    defaultValue: integerValueNode('0'),
                    defaultValueStrategy: 'omitted',
                }),
                structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u8') }),
            ]),
        }),
        instructionNode({
            identifier: 'incrementV2',
            accounts: [
                instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: false }),
                instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: true }),
            ],
            data: structTypeNode([
                structFieldTypeNode({
                    identifier: 'version',
                    type: integerTypeNode('u8'),
                    defaultValue: integerValueNode('1'),
                    defaultValueStrategy: 'omitted',
                }),
                structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u8') }),
            ]),
        }),
    ],
});
`,
        ),
    ),
    example(
        'A deprecated instruction',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'oldIncrement',
    status: instructionStatusNode(
        'deprecated',
        'Use the \`increment\` instruction instead. This will be removed in v3.0.0.',
    ),
    accounts: [instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: false })],
    data: structTypeNode([structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u8') })]),
});
`,
        ),
    ),
    example(
        'An archived instruction',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'legacyTransfer',
    status: instructionStatusNode(
        'archived',
        'This instruction was removed in v2.0.0. It is kept here for historical parsing.',
    ),
    accounts: [
        instructionAccountNode({ identifier: 'source', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'destination', isWritable: true, isSigner: false }),
    ],
    data: structTypeNode([structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u64') })]),
});
`,
        ),
    ),
    example(
        'A draft instruction',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'experimentalFeature',
    status: instructionStatusNode('draft', 'This instruction is under development and may change.'),
    accounts: [instructionAccountNode({ identifier: 'config', isWritable: true, isSigner: true })],
});
`,
        ),
    ),
];
