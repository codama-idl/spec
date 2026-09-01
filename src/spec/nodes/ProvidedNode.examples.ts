import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Providing a constant value to consumers',
        code(
            'typescript',
            `
providedNode('decimals', numberValueNode(9));
`,
        ),
    ),
    example(
        'A provided value consumed via injection',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'transferChecked',
    provides: [providedNode('decimals', numberValueNode(9))],
    arguments: [
        instructionArgumentNode({
            identifier: 'decimals',
            type: numberTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'decimals' }),
        }),
        // ...
    ],
});
`,
        ),
    ),
];
