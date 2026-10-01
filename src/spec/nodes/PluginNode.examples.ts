import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'A plugin carrying custom structured data',
        code(
            'typescript',
            `
pluginNode('explorerHints', {
    payload: { icon: 'transfer-arrow', priority: 2 },
});
`,
        ),
    ),
    example(
        'A marker plugin without a payload',
        code(
            'typescript',
            `
pluginNode('audited');
`,
        ),
    ),
    example(
        'An instruction tagged with a plugin',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'transfer',
    plugins: [pluginNode('explorerHints', { payload: { icon: 'transfer-arrow' } })],
    // ...
});
`,
        ),
    ),
    example(
        'Official plugins describing a resolver and the extra argument it depends on',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'destination',
            isWritable: true,
            isSigner: false,
            plugins: [
                pluginNode('codama.resolver', {
                    payload: { name: 'resolveDestination', dependsOn: ['accounts.owner', 'data.useAta'] },
                }),
            ],
        }),
        // ...
    ],
    plugins: [
        pluginNode('codama.extraArgument', {
            payload: { identifier: 'useAta', type: booleanTypeNode() },
        }),
    ],
});
`,
        ),
    ),
];
