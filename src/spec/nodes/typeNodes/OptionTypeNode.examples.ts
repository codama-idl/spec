import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'An optional UTF-8 with a u16 prefix',
        code(
            'typescript',
            `
optionTypeNode(stringTypeNode('utf8'), { prefix: integerTypeNode('u16') });

// None          => 0x0000
// Some("Hello") => 0x010048656C6C6F
`,
        ),
    ),
    example(
        'A fixed optional u32 number',
        code(
            'typescript',
            `
optionTypeNode(integerTypeNode('u32'), { fixed: true });

// None     => 0x0000000000
// Some(42) => 0x012A000000
`,
        ),
    ),
];
