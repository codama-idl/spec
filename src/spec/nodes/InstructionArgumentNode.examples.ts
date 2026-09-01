import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'An argument with a default value',
        code(
            'typescript',
            `
instructionArgumentNode({
    identifier: 'amount',
    type: numberTypeNode('u64'),
    defaultValue: numberValueNode(0),
});
`,
        ),
    ),
    example(
        'An argument with an omitted default value',
        code(
            'typescript',
            `
instructionArgumentNode({
    identifier: 'instructionDiscriminator',
    type: numberTypeNode('u8'),
    defaultValue: numberValueNode(42),
    defaultValueStrategy: 'omitted',
});
`,
        ),
    ),
];
