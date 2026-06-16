import { defineNode, optionalAttribute, u64 } from '../../../api';

export const stringDisplayNode = defineNode('stringDisplayNode', {
    docs: [
        'Display metadata for a string value.',
        "The string's wire encoding is carried by `stringTypeNode.encoding`; this node only addresses presentation.",
    ],
    attributes: [
        optionalAttribute('sliceStart', u64(), {
            docs: [
                'The start index of the displayed slice, inclusive. Defaults to the start of the string.',
                'Indices apply to the decoded character sequence.',
            ],
        }),
        optionalAttribute('sliceEnd', u64(), {
            docs: [
                'The end index of the displayed slice, exclusive. Defaults to the end of the string.',
                'Indices apply to the decoded character sequence.',
            ],
        }),
    ],
});
