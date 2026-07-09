import { defineNode } from '../../../api';
import { examples } from './IdentityValueNode.examples';

export const identityValueNode = defineNode('identityValueNode', {
    docs: ['Refers to the wallet identity providing the instruction context.'],
    attributes: [],
    examples,
});
