import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a map type node from a key type, a value type, and a count node',
        code(
            'typescript',
            `
const node = mapTypeNode(publicKeyTypeNode(), numberTypeNode('u32'), prefixedCountNode(numberTypeNode('u32')));
`,
        ),
    ),
    example(
        'A histogram that counts letters',
        code(
            'typescript',
            `
mapTypeNode(
    fixedSizeTypeNode(stringTypeNode('utf8'), 1), // Key: Single UTF-8 character.
    numberTypeNode('u16'), // Value: 16-bit unsigned integer.
    prefixedCountNode(numberTypeNode('u8')), // Count: map length is prefixed with a u8.
);

// { A: 42, B: 1, C: 16 } => 0x03412A00420100431000
`,
        ),
    ),
];
