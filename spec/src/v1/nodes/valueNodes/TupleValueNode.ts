import { array, attribute, defineNode, union } from '../../../api';

export const tupleValueNode = defineNode('tupleValueNode', {
    docs: ['A concrete tuple value: a fixed-length sequence of positional value nodes.'],
    attributes: [
        attribute('items', array(union('ValueNode')), {
            docs: ['The positional items of the tuple, in order.'],
        }),
    ],
});
