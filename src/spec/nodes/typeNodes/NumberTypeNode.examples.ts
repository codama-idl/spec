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
        {
            docs: [
                '![Diagram](https://github.com/codama-idl/codama/assets/3642397/4bb1ae23-c69f-4c9f-a7ec-8f971d061667)',
            ],
        },
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
        {
            docs: [
                '![Diagram](https://github.com/codama-idl/codama/assets/3642397/d9cbfd3c-b8a2-4c13-a8a8-a11e7ed5d422)',
            ],
        },
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
        {
            docs: [
                '![Diagram](https://github.com/codama-idl/codama/assets/3642397/73e12166-cdaa-4fca-ae2a-67937f8b130e)',
            ],
        },
    ),
];
