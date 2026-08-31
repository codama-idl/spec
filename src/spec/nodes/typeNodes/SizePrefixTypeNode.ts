import { attribute, defineNode, nestedUnion, union } from '../../../api';
import { examples } from './SizePrefixTypeNode.examples';

export const sizePrefixTypeNode = defineNode('sizePrefixTypeNode', {
    docs: [
        'Wraps another type with a numeric prefix indicating the byte length of the wrapped type.',
        'When decoding, the size is read first and determines how many bytes the wrapped type may consume.',
    ],
    attributes: [
        attribute('type', union('typeNode'), {
            docs: ['The wrapped type whose serialisation is preceded by its size.'],
        }),
        attribute('prefix', nestedUnion('nestedTypeNode', 'numberTypeNode'), {
            docs: ['The numeric type used as the size prefix.'],
        }),
    ],
    examples,
});
