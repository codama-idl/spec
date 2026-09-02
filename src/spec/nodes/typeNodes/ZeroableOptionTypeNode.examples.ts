import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'a u32 zeroable option',
        code(
            'typescript',
            `
zeroableOptionTypeNode(integerTypeNode('u32'));

// None     => 0x00000000
// Some(42) => 0x2A000000
`,
        ),
    ),
    example(
        'a u32 zeroable option with a custom zero value',
        code(
            'typescript',
            `
zeroableOptionTypeNode(integerTypeNode('u32'), constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffffffff')));

// None     => 0xFFFFFFFF
// Some(42) => 0x2A000000
`,
        ),
    ),
];
