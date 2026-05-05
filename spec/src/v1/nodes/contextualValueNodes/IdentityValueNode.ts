import { defineNode } from '../../../api';

export const identityValueNode = defineNode('identityValueNode', {
    docs: 'Refers to the wallet identity providing the instruction context.',
    attributes: [],
});
