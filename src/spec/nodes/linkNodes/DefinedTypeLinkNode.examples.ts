import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a defined type link node from a type name',
        code(
            'typescript',
            `
const node = definedTypeLinkNode('myDefinedType');
const nodeFromAnotherProgram = definedTypeLinkNode('myDefinedType', 'myOtherProgram');
`,
        ),
    ),
];
