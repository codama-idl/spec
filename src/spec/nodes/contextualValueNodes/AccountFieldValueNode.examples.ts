import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an account field value node from an account name and a field path',
        code(
            'typescript',
            `
const node = accountFieldValueNode('mint', 'decimals');
`,
        ),
    ),
    example(
        'An argument defaulting to a field of an instruction account',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'transferChecked',
    accounts: [
        instructionAccountNode({
            identifier: 'mint',
            isWritable: false,
            isSigner: false,
            accountLink: accountLinkNode('mint'),
        }),
        // ...
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'decimals',
            type: numberTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'decimals' }),
        }),
        // ...
    ]),
    provides: [providedNode('decimals', accountFieldValueNode('mint', 'decimals'))],
});
`,
        ),
    ),
];
