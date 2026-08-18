import { attribute, defineNode, nestedUnion } from '../../../api';
import { examples } from './SolAmountTypeNode.examples';

export const solAmountTypeNode = defineNode('solAmountTypeNode', {
    docs: [
        'A SOL amount expressed in lamports under the wrapped numeric type.',
        'Equivalent to an `amountTypeNode` with 9 decimals and `SOL` as the unit.',
    ],
    attributes: [
        attribute('number', nestedUnion('nestedTypeNode', 'numberTypeNode'), {
            docs: ['The numeric type used to serialise the lamport amount.'],
        }),
    ],
    examples,
});
