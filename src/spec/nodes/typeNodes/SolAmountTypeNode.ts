import { attribute, defineNode, node } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './SolAmountTypeNode.examples';

export const solAmountTypeNode = defineNode('solAmountTypeNode', {
    docs: [
        'A SOL amount expressed in lamports under the inner numeric type.',
        'Equivalent to an `amountTypeNode` with 9 decimals and `SOL` as the unit.',
    ],
    attributes: [
        attribute('number', node('numberTypeNode'), {
            docs: ['The numeric type used to serialise the lamport amount.'],
        }),
        transformsAttribute(),
    ],
    examples,
});
