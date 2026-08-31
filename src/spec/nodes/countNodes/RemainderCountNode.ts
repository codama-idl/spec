import { defineNode } from '../../../api';
import { examples } from './RemainderCountNode.examples';

export const remainderCountNode = defineNode('remainderCountNode', {
    docs: [
        'A count strategy where items are read until the buffer is exhausted.',
        'When encoding, items are serialised as-is and the total count is never stored; when decoding, items are read one by one until the end of the buffer.',
        'This strategy is therefore only meaningful for the last variable-size region of a buffer.',
    ],
    attributes: [],
    examples,
});
