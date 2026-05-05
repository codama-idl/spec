import { attribute, defineNode, nestedTypeNode } from '../../../api';

export const solAmountTypeNode = defineNode('solAmountTypeNode', {
    docs: 'A SOL amount expressed in lamports under the wrapped numeric type.',
    attributes: [
        attribute('number', nestedTypeNode('numberTypeNode'), {
            docs: 'The numeric type used to serialise the lamport amount.',
        }),
    ],
});
