import {
    array,
    attribute,
    byteSize,
    defineNode,
    docs,
    nestedTypeNode,
    node,
    optionalAttribute,
    stringIdentifier,
    union,
} from '../../api';

export const accountNode = defineNode('accountNode', {
    docs: 'An on-chain account: its name, data structure, optional fixed size, optional PDA, and optional discriminators.',
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: 'The name of the account.',
        }),
        optionalAttribute('size', byteSize(), {
            docs: 'The size of the account in bytes, when the data length is fixed.',
        }),
        optionalAttribute('docs', docs(), {
            docs: 'Markdown documentation for the account.',
        }),
        attribute('data', nestedTypeNode('structTypeNode'), {
            docs: 'The struct describing the account data.',
        }),
        optionalAttribute('pda', node('pdaLinkNode'), {
            docs: 'A link to the PDA the account is derived from, if applicable.',
        }),
        optionalAttribute('discriminators', array(union('DiscriminatorNode')), {
            docs: 'Discriminators that distinguish this account from others in the program. When multiple are listed, they are combined with a logical AND.',
        }),
    ],
});
