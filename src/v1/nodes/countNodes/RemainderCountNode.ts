import { defineNode } from '../../../api';

export const remainderCountNode = defineNode('remainderCountNode', {
    docs: ['A count strategy where items are read until the buffer is exhausted.'],
    attributes: [],
});
