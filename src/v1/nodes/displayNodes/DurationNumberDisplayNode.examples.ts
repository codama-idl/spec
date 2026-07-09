import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A duration already in seconds',
        code(
            'typescript',
            `
numberTypeNode('u32', 'le', { display: durationNumberDisplayNode({}) });

// 3600 => "01:00:00"
`,
        ),
    ),
    example(
        'A duration in milliseconds scaled back to seconds',
        code(
            'typescript',
            `
numberTypeNode('u64', 'le', { display: durationNumberDisplayNode({ ticksPerSecond: 1000 }) });

// 90_000 => "00:01:30"
`,
        ),
    ),
];
