import { defineNode } from '../../../api';
import { examples } from './RemainderCountNode.examples';

export const remainderCountNode = defineNode('remainderCountNode', {
    docs: ['A count strategy where items are read until the buffer is exhausted.'],
    attributes: [],
    examples,
});
