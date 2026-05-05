import { array, attribute, defineNode, union } from '../../../api';

export const setValueNode = defineNode('setValueNode', {
    docs: 'A concrete set value: a list of unique value nodes.',
    attributes: [
        attribute('items', array(union('ValueNode')), {
            docs: 'The items of the set.',
        }),
    ],
});
