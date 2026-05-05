import { attribute, defineNode, nestedTypeNode } from '../../../api';

export const prefixedCountNode = defineNode('prefixedCountNode', {
    docs: 'A count strategy where the number of items is read from a numeric prefix.',
    attributes: [
        attribute('prefix', nestedTypeNode('numberTypeNode'), {
            docs: 'The numeric type used as the count prefix.',
        }),
    ],
});
