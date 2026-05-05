import { array, attribute, defineNode, node } from '../../../api';

export const structValueNode = defineNode('structValueNode', {
    docs: 'A concrete struct value: a list of named field values.',
    attributes: [
        attribute('fields', array(node('structFieldValueNode')), {
            docs: 'The named fields of the struct value.',
        }),
    ],
});
