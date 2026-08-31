import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an instruction argument link node from an argument name',
        code(
            'typescript',
            `
// Links to an argument in the current instruction.
const node = instructionArgumentLinkNode('myArgument');

// Links to an argument in another instruction but within the same program.
const nodeFromAnotherInstruction = instructionArgumentLinkNode('myArgument', 'myOtherInstruction');

// Links to an argument in another instruction from another program.
const nodeFromAnotherProgram = instructionArgumentLinkNode(
    'myArgument',
    instructionLinkNode('myOtherInstruction', 'myOtherProgram'),
);
`,
        ),
    ),
];
