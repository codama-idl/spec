import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'An instruction with a u8 discriminator',
        code(
            'typescript',
            `
instructionNode({
    name: 'increment',
    accounts: [
        instructionAccountNode({ name: 'counter', isWritable: true, isSigner: true }),
        instructionAccountNode({ name: 'authority', isWritable: false, isSigner: false }),
    ],
    arguments: [
        instructionArgumentNode({
            name: 'discriminator',
            type: numberTypeNode('u8'),
            defaultValue: numberValueNode(42),
            defaultValueStrategy: 'omitted',
        }),
    ],
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
    name: 'createCounter',
    accounts: [
        instructionAccountNode({ name: 'counter', isWritable: true, isSigner: true }),
        instructionAccountNode({ name: 'authority', isWritable: false, isSigner: false }),
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
    name: 'initialize',
    accounts: [
        instructionAccountNode({ name: 'counter', isWritable: true, isSigner: true }),
        instructionAccountNode({ name: 'authority', isWritable: false, isSigner: false }),
        instructionAccountNode({ name: 'freezeAuthority', isWritable: false, isSigner: false, isOptional: true }),
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
    name: 'multisigIncrement',
    accounts: [instructionAccountNode({ name: 'counter', isWritable: true, isSigner: false })],
    remainingAccounts: [instructionRemainingAccountsNode(argumentValueNode('authorities'), { isSigner: true })],
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
    name: 'increment',
    accounts: [
        instructionAccountNode({ name: 'counter', isWritable: true, isSigner: 'either' }),
        instructionAccountNode({ name: 'authority', isWritable: false, isSigner: true }),
    ],
    arguments: [
        instructionArgumentNode({ name: 'version', type: numberTypeNode('u8') }),
        instructionArgumentNode({ name: 'amount', type: numberTypeNode('u8') }),
    ],
    subInstructions: [
        instructionNode({
            name: 'incrementV1',
            accounts: [instructionAccountNode({ name: 'counter', isWritable: true, isSigner: true })],
            arguments: [
                instructionArgumentNode({
                    name: 'version',
                    type: numberTypeNode('u8'),
                    defaultValue: numberValueNode(0),
                    defaultValueStrategy: 'omitted',
                }),
                instructionArgumentNode({ name: 'amount', type: numberTypeNode('u8') }),
            ],
        }),
        instructionNode({
            name: 'incrementV2',
            accounts: [
                instructionAccountNode({ name: 'counter', isWritable: true, isSigner: false }),
                instructionAccountNode({ name: 'authority', isWritable: false, isSigner: true }),
            ],
            arguments: [
                instructionArgumentNode({
                    name: 'version',
                    type: numberTypeNode('u8'),
                    defaultValue: numberValueNode(1),
                    defaultValueStrategy: 'omitted',
                }),
                instructionArgumentNode({ name: 'amount', type: numberTypeNode('u8') }),
            ],
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
    name: 'oldIncrement',
    status: instructionStatusNode(
        'deprecated',
        'Use the \`increment\` instruction instead. This will be removed in v3.0.0.',
    ),
    accounts: [instructionAccountNode({ name: 'counter', isWritable: true, isSigner: false })],
    arguments: [instructionArgumentNode({ name: 'amount', type: numberTypeNode('u8') })],
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
    name: 'legacyTransfer',
    status: instructionStatusNode(
        'archived',
        'This instruction was removed in v2.0.0. It is kept here for historical parsing.',
    ),
    accounts: [
        instructionAccountNode({ name: 'source', isWritable: true, isSigner: true }),
        instructionAccountNode({ name: 'destination', isWritable: true, isSigner: false }),
    ],
    arguments: [instructionArgumentNode({ name: 'amount', type: numberTypeNode('u64') })],
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
    name: 'experimentalFeature',
    status: instructionStatusNode('draft', 'This instruction is under development and may change.'),
    accounts: [instructionAccountNode({ name: 'config', isWritable: true, isSigner: true })],
    arguments: [],
});
`,
        ),
    ),
];
