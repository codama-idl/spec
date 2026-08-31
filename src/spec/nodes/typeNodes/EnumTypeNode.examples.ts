import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Enum with u8 discriminator',
        code(
            'typescript',
            `
enumTypeNode([
    enumEmptyVariantTypeNode('flip'),
    enumTupleVariantTypeNode('rotate', tupleTypeNode([numberTypeNode('u32')])),
    enumStructVariantTypeNode(
        'move',
        structTypeNode([
            structFieldTypeNode({ name: 'x', type: numberTypeNode('u16') }),
            structFieldTypeNode({ name: 'y', type: numberTypeNode('u16') }),
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
