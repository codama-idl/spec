import { array, attribute, defineNode, node } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './StructTypeNode.examples';

export const structTypeNode = defineNode('structTypeNode', {
    docs: [
        'A composite type made of an ordered list of named fields. Fields are encoded and decoded in declaration order.',
    ],
    attributes: [
        attribute('fields', array(node('structFieldTypeNode')), {
            docs: ['The fields of the struct, in declaration order.'],
        }),
        transformsAttribute(),
    ],
    examples,
});
