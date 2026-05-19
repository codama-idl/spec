import { array, attribute, defineNode, node } from '../../../api';

export const structTypeNode = defineNode('structTypeNode', {
    docs: [
        'A composite type made of an ordered list of named fields. Fields are encoded and decoded in declaration order.',
    ],
    attributes: [
        attribute('fields', array(node('structFieldTypeNode')), {
            docs: ['The fields of the struct, in declaration order.'],
        }),
    ],
});
