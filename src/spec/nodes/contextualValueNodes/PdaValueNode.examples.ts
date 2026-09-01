import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a PDA value node from a PDA definition and seed values',
        code(
            'typescript',
            `
const node = pdaValueNode('associatedToken', [
    pdaSeedValueNode('mint', publicKeyValueNode('G345gmp34svbGxyXuCvKVVHDbqJQ66y65vVrx7m7FmBE')),
    pdaSeedValueNode('owner', publicKeyValueNode('Nzgr9bYfMRq5768bHfXsXoPTnLWAXgQNosRBxK63jRH')),
]);
`,
        ),
    ),
    example(
        'A PDA value whose seeds point to other accounts',
        code(
            'typescript',
            `
pdaValueNode('associatedToken', [
    pdaSeedValueNode('mint', accountValueNode('mint')),
    pdaSeedValueNode('owner', accountValueNode('authority')),
]);
`,
        ),
    ),
    example(
        'A PDA value with an inlined PDA definition',
        code(
            'typescript',
            `
const inlinedPdaNode = pdaNode({
    identifier: 'associatedToken',
    seeds: [
        variablePdaSeedNode('mint', publicKeyTypeNode()),
        constantPdaSeedNode(publicKeyTypeNode(), publicKeyValueNode('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')),
        variablePdaSeedNode('owner', publicKeyTypeNode()),
    ],
});

pdaValueNode(inlinedPdaNode, [
    pdaSeedValueNode('mint', accountValueNode('mint')),
    pdaSeedValueNode('owner', accountValueNode('authority')),
]);
`,
        ),
    ),
];
