import { defineNode } from '../../../api';
import { examples } from './NoneValueNode.examples';

export const noneValueNode = defineNode('noneValueNode', {
    docs: [
        'The "absent" value for an optional type.',
        'For instance, this can be set as the default value of a field whose type is an `optionTypeNode`.',
    ],
    attributes: [],
    examples,
});
