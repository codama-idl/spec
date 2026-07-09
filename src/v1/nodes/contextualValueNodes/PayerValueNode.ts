import { defineNode } from '../../../api';
import { examples } from './PayerValueNode.examples';

export const payerValueNode = defineNode('payerValueNode', {
    docs: ['Refers to the wallet paying for the surrounding transaction.'],
    attributes: [],
    examples,
});
