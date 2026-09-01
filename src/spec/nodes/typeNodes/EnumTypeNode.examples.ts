import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Enum with u8 discriminator',
        code(
            'typescript',
            `
enumTypeNode([
    enumVariantTypeNode('flip'),
    enumVariantTypeNode('rotate', numberTypeNode('u32')),
    enumVariantTypeNode(
        'move',
        structTypeNode([
            structFieldTypeNode({ identifier: 'x', type: numberTypeNode('u16') }),
            structFieldTypeNode({ identifier: 'y', type: numberTypeNode('u16') }),
        ]),
    ),
]);

// Flip                => 0x00
// Rotate (42)         => 0x012A000000
// Move { x: 1, y: 2 } => 0x0201000200
`,
        ),
    ),
];
