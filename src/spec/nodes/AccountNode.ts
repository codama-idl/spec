import {
    array,
    attribute,
    byteSize,
    defineNode,
    docs,
    node,
    optionalAttribute,
    stringIdentifier,
    union,
} from '../../api';
import { examples } from './AccountNode.examples';

export const accountNode = defineNode('accountNode', {
    docs: [
        'An on-chain account: its identifier, data type, optional fixed size, optional PDA, and optional discriminators.',
        '',
        '![Diagram](https://github.com/codama-idl/codama/assets/3642397/77974dad-212e-49b1-8e41-5d466c273a02)',
    ],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the account.'],
        }),
        optionalAttribute('size', byteSize(), {
            docs: ['The size of the account in bytes, when the data length is fixed.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the account.'],
        }),
        attribute('data', union('typeNode'), {
            docs: [
                'The type describing the account data — any type node, including a `definedTypeLinkNode` to share or reuse a defined type.',
                'Nodes that reference account fields by name — e.g. `accountDataValueNode` or `fieldDiscriminatorNode` — are only valid when this type resolves to a struct (following links).',
            ],
        }),
        optionalAttribute('pda', node('pdaLinkNode'), {
            docs: ['A link to the PDA the account is derived from, if applicable.'],
        }),
        optionalAttribute('discriminators', array(union('discriminatorNode')), {
            docs: [
                'Discriminators that distinguish this account from others in the program.',
                'When multiple are listed, they are combined with a logical AND.',
            ],
        }),
    ],
    examples,
});
