import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A u64 unix timestamp in seconds',
        code(
            'typescript',
            `
const node = dateTimeTypeNode(integerTypeNode('u64'));

// 2024-06-27T14:57:56Z => 0xF47D7D6600000000
`,
        ),
    ),
    example(
        'An i64 unix timestamp in milliseconds',
        code(
            'typescript',
            `
dateTimeTypeNode(integerTypeNode('i64'), { ticksPerSecond: 1000 });
`,
        ),
    ),
];
