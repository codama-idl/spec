import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an account data value node from an account name and a path',
        code(
            'typescript',
            `
const node = accountDataValueNode('mint', 'decimals');
`,
        ),
    ),
    example(
        'A data field defaulting to a value within an instruction account',
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
            type: integerTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'decimals' }),
        }),
        // ...
    ]),
    provides: [providedNode('decimals', accountDataValueNode('mint', 'decimals'))],
});
`,
        ),
    ),
];
