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
    name: 'transfer',
    plugins: [pluginNode('explorerHints', { payload: { icon: 'transfer-arrow' } })],
    // ...
});
`,
        ),
    ),
];
