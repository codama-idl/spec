import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Plain text — the canonical spelling when no metadata is attached',
        code(
            'jsonc',
            `
"docs": "Transfers tokens.\\nFails when the account is frozen."
`,
        ),
    ),
    example(
        'Translated text',
        code(
            'jsonc',
            `
"intent": {
    "kind": "textNode",
    "content": "Transfer",
    "plugins": [
        { "kind": "pluginNode", "namespace": "i18n.es", "payload": "Transferir" },
        { "kind": "pluginNode", "namespace": "i18n.fr", "payload": "Transf\\u00e9rer" }
    ]
}
`,
        ),
    ),
    example(
        'A translated display intent, via the node factories',
        code(
            'typescript',
            `
instructionDisplayNode({
    intent: textNode('Transfer', {
        plugins: [pluginNode('i18n.es', { payload: 'Transferir' })],
    }),
});
`,
        ),
    ),
];
