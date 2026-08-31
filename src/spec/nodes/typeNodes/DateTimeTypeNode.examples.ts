import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a date time type node from a number type node',
        code(
            'typescript',
            `
const node = dateTimeTypeNode(numberTypeNode('u64'));
`,
        ),
    ),
    example(
        'u64 unix datetime',
        code(
            'typescript',
            `
dateTimeTypeNode(numberTypeNode('u64'));

// 2024-06-27T14:57:56Z => 0xF47D7D6600000000
`,
        ),
    ),
];
