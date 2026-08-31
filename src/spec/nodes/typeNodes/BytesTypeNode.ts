import { defineNode } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './BytesTypeNode.examples';

export const bytesTypeNode = defineNode('bytesTypeNode', {
    docs: [
        'A raw sequence of bytes. Typically carries a fixed-size, size-prefix, or sentinel transform to bound its extent.',
    ],
    attributes: [transformsAttribute()],
    examples,
});
