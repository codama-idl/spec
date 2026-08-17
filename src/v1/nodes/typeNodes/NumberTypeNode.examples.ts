import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Encoding `u32` integers',
        code(
            'typescript',
            `
numberTypeNode('u32');

// 5     => 0x05000000
// 42    => 0x2A000000
// 65535 => 0xFFFF0000
`,
        ),
    ),
    example(
        'Encoding `f32` big-endian decimal numbers',
        code(
            'typescript',
            `
numberTypeNode('f32', 'be');

// 1      => 0x3F800000
// -42    => 0xC2280000
// 3.1415 => 0x40490E56
`,
        ),
    ),
    example(
        'Encoding `shortU16` integers',
        code(
            'typescript',
            `
numberTypeNode('shortU16');

// 42    => 0x2A
// 128   => 0x8001
// 16384 => 0x808001
`,
        ),
    ),
];
