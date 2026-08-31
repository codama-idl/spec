import { attribute, defineNode, union } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './ArrayTypeNode.examples';

export const arrayTypeNode = defineNode('arrayTypeNode', {
    docs: [
        'A homogeneous list of items. The item type is defined by `item`; the length is determined by the `count` strategy.',
    ],
    attributes: [
        attribute('item', union('typeNode'), {
            docs: ['The type of each item in the array.'],
        }),
        attribute('count', union('countNode'), {
            docs: ['The strategy used to determine the number of items.'],
        }),
        transformsAttribute(),
    ],
    examples,
});
