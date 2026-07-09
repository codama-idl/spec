import { defineNode } from '../../../api';
import { examples } from './BytesTypeNode.examples';

export const bytesTypeNode = defineNode('bytesTypeNode', {
    docs: [
        'A raw sequence of bytes. Typically used inside a fixed-size, size-prefixed, or sentinel-terminated wrapper.',
    ],
    attributes: [],
    examples,
});
