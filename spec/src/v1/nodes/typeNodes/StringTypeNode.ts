import { attribute, defineNode, enumeration } from '../../../api';

export const stringTypeNode = defineNode('stringTypeNode', {
    docs: 'A string value. The encoding describes how its bytes are written; the byte length is determined by an enclosing wrapper such as `sizePrefixTypeNode` or `fixedSizeTypeNode`.',
    attributes: [
        attribute('encoding', enumeration('BytesEncoding'), {
            docs: 'The byte encoding used to serialise the string.',
        }),
    ],
});
