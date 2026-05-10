import { attribute, defineNode, nestedUnion, union } from '../../../api';

export const sizePrefixTypeNode = defineNode('sizePrefixTypeNode', {
    docs: ['Wraps another type with a numeric prefix indicating the byte length of the wrapped type.'],
    attributes: [
        attribute('type', union('TypeNode'), {
            docs: ['The wrapped type whose serialisation is preceded by its size.'],
        }),
        attribute('prefix', nestedUnion('NestedTypeNode', 'numberTypeNode'), {
            docs: ['The numeric type used as the size prefix.'],
        }),
    ],
});
