import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A struct field with a default value',
        code(
            'typescript',
            `
structFieldTypeNode({
    identifier: 'age',
    type: numberTypeNode('u8'),
    defaultValue: numberValueNode(42),
});

// {}          => 0x2A
// { age: 29 } => 0x1D
`,
        ),
    ),
];
