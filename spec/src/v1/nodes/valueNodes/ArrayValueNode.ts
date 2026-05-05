import { array, attribute, defineNode, union } from '../../../api';

export const arrayValueNode = defineNode('arrayValueNode', {
    docs: 'A concrete array value: a list of value nodes.',
    attributes: [
        attribute('items', array(union('ValueNode')), {
            docs: 'The items of the array, in order.',
        }),
    ],
});
