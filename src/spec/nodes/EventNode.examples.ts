import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'An event with a struct payload',
        code(
            'typescript',
            `
eventNode({
    identifier: 'transferEvent',
    data: structTypeNode([
        structFieldTypeNode({ identifier: 'authority', type: publicKeyTypeNode() }),
        structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u64') }),
    ]),
});
`,
        ),
    ),
    example(
        'An event with a hidden prefix discriminator',
        code(
            'typescript',
            `
eventNode({
    identifier: 'transferEvent',
    data: structTypeNode([structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u64') })], {
        transforms: [
            hiddenPrefixTransformNode([
                constantValueNode(bytesTypeNode({ transforms: [fixedSizeTransformNode(8)] }), bytesValueNode('base16', '0102030405060708')),
            ]),
        ],
    }),
    discriminators: [
        constantDiscriminatorNode(
            constantValueNode(bytesTypeNode({ transforms: [fixedSizeTransformNode(8)] }), bytesValueNode('base16', '0102030405060708')),
        ),
    ],
});
`,
        ),
    ),
];
