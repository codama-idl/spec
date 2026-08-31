import { attribute, defineNode, u64, union } from '../../../api';
import { examples } from './FixedSizeTypeNode.examples';

export const fixedSizeTypeNode = defineNode('fixedSizeTypeNode', {
    docs: ['Wraps another type and asserts a fixed total byte size. Padding or truncation is applied as needed.'],
    attributes: [
        attribute('size', u64(), {
            docs: ['The total byte size the wrapped type must occupy.'],
        }),
        attribute('type', union('typeNode'), {
            docs: ['The wrapped type whose serialisation is constrained.'],
        }),
    ],
    examples,
});
