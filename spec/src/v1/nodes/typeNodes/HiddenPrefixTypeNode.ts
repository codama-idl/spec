import { array, attribute, defineNode, node, union } from '../../../api';

export const hiddenPrefixTypeNode = defineNode('hiddenPrefixTypeNode', {
    docs: [
        'Prefixes another type with a list of constant values that are written and read but not surfaced as fields to consumers.',
    ],
    attributes: [
        attribute('type', union('TypeNode'), {
            docs: ['The wrapped type whose serialisation is preceded by the hidden prefix.'],
        }),
        attribute('prefix', array(node('constantValueNode')), {
            docs: ['The constant values written before the wrapped type, in order.'],
        }),
    ],
});
