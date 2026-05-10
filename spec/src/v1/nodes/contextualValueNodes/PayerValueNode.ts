import { defineNode } from '../../../api';

export const payerValueNode = defineNode('payerValueNode', {
    docs: ['Refers to the wallet paying for the surrounding transaction.'],
    attributes: [],
});
