import { attribute, defineNode, nestedUnion } from '../../../api';

export const solAmountTypeNode = defineNode('solAmountTypeNode', {
    docs: ['A SOL amount expressed in lamports under the wrapped numeric type.'],
    attributes: [
        attribute('number', nestedUnion('NestedTypeNode', 'numberTypeNode'), {
            docs: ['The numeric type used to serialise the lamport amount.'],
        }),
    ],
});
