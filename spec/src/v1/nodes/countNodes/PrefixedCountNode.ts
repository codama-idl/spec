import { attribute, defineNode, nestedUnion } from '../../../api';

export const prefixedCountNode = defineNode('prefixedCountNode', {
    docs: ['A count strategy where the number of items is read from a numeric prefix.'],
    attributes: [
        attribute('prefix', nestedUnion('NestedTypeNode', 'numberTypeNode'), {
            docs: ['The numeric type used as the count prefix.'],
        }),
    ],
});
