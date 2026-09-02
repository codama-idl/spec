import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'u8 booleans',
        code(
            'typescript',
            `
booleanTypeNode();

// true  => 0x01
// false => 0x00
`,
        ),
    ),
    example(
        'u32 booleans',
        code(
            'typescript',
            `
booleanTypeNode(integerTypeNode('u32'));

// true  => 0x01000000
// false => 0x00000000
`,
        ),
    ),
];
