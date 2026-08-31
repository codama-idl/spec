import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an instruction link node from an instruction name',
        code(
            'typescript',
            `
const node = instructionLinkNode('myInstruction');
const nodeFromAnotherProgram = instructionLinkNode('myInstruction', 'myOtherProgram');
`,
        ),
    ),
];
