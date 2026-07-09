import { defineNode } from '../../../api';
import { examples } from './ProgramIdValueNode.examples';

export const programIdValueNode = defineNode('programIdValueNode', {
    docs: ['Refers to the program ID of the surrounding instruction.'],
    attributes: [],
    examples,
});
