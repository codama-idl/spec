import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a PDA link node from a PDA name',
        code(
            'typescript',
            `
const node = pdaLinkNode('myPda');
const nodeFromAnotherProgram = pdaLinkNode('myPda', 'myOtherProgram');
`,
        ),
    ),
];
