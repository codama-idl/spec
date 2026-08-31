import { attribute, byteSize, defineNode } from '../../../api';
import { examples } from './FixedSizeTransformNode.examples';

export const fixedSizeTransformNode = defineNode('fixedSizeTransformNode', {
    docs: ['Asserts a fixed total byte size for the transformed type. Padding or truncation is applied as needed.'],
    attributes: [
        attribute('size', byteSize(), {
            docs: ['The total byte size the transformed type must occupy.'],
        }),
    ],
    examples,
});
