import { array, attribute, defineNode, node, union } from '../../../api';

export const hiddenSuffixTypeNode = defineNode('hiddenSuffixTypeNode', {
    docs: [
        'Suffixes another type with a list of constant values that are written and read but not surfaced as fields to consumers.',
    ],
    attributes: [
        attribute('type', union('TypeNode'), {
            docs: ['The wrapped type whose serialisation is followed by the hidden suffix.'],
        }),
        attribute('suffix', array(node('constantValueNode')), {
            docs: ['The constant values written after the wrapped type, in order.'],
        }),
    ],
});
