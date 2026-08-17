import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a program link node from a program name',
        code(
            'typescript',
            `
const node = programLinkNode('myProgram');
`,
        ),
    ),
];
