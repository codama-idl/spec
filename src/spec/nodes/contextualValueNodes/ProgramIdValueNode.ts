import { defineNode } from '../../../api';
import { examples } from './ProgramIdValueNode.examples';

export const programIdValueNode = defineNode('programIdValueNode', {
    docs: [
        'Refers to the program ID of the surrounding instruction — that is, the address of the `programNode` this node descends from.',
    ],
    attributes: [],
    examples,
});
