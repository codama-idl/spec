import { array, attribute, defineNode, union } from '../../../api';
import { examples } from './TupleTypeNode.examples';

export const tupleTypeNode = defineNode('tupleTypeNode', {
    docs: ['A heterogeneous fixed-length sequence in which each positional slot has its own type.'],
    attributes: [
        attribute('items', array(union('typeNode')), {
            docs: ['The type of each positional slot, in order.'],
        }),
    ],
    examples,
});
