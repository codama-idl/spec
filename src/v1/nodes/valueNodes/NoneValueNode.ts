import { defineNode } from '../../../api';
import { examples } from './NoneValueNode.examples';

export const noneValueNode = defineNode('noneValueNode', {
    docs: ['The "absent" value for an optional type.'],
    attributes: [],
    examples,
});
