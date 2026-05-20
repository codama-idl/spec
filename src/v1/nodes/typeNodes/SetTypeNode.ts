import { attribute, defineNode, union } from '../../../api';

export const setTypeNode = defineNode('setTypeNode', {
    docs: [
        'A unique-valued collection. The item type is defined by `item`; the size is determined by the `count` strategy.',
    ],
    attributes: [
        attribute('item', union('typeNode'), {
            docs: ['The type of each item in the set.'],
        }),
        attribute('count', union('countNode'), {
            docs: ['The strategy used to determine the number of items.'],
        }),
    ],
});
