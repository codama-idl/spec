import { attribute, defineNode, enumeration, node, optionalAttribute } from '../../../api';

export const stringTypeNode = defineNode('stringTypeNode', {
    docs: [
        'A string value.',
        'The encoding describes how its bytes are written.',
        'The byte length is determined by an enclosing wrapper such as `sizePrefixTypeNode` or `fixedSizeTypeNode`.',
    ],
    attributes: [
        attribute('encoding', enumeration('bytesEncoding'), {
            docs: ['The byte encoding used to serialise the string.'],
        }),
        optionalAttribute('display', node('stringDisplayNode'), {
            docs: ['Display metadata describing how the string is presented.'],
        }),
    ],
});
