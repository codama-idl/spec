import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A duration in seconds',
        code(
            'typescript',
            `
const node = durationTypeNode(integerTypeNode('u32'));

// 3661 => 01:01:01
`,
        ),
    ),
    example(
        'A duration in milliseconds',
        code(
            'typescript',
            `
durationTypeNode(integerTypeNode('u64'), { ticksPerSecond: 1000 });
`,
        ),
    ),
];
