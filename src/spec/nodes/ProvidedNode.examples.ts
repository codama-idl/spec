import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Providing a constant value to consumers',
        code(
            'typescript',
            `
providedNode('decimals', integerValueNode('9'));
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
    provides: [providedNode('decimals', integerValueNode('9'))],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'decimals',
            type: integerTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'decimals' }),
        }),
        // ...
    ]),
});
`,
        ),
    ),
];
