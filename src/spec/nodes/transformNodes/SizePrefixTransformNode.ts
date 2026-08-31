import { attribute, defineNode, node } from '../../../api';
import { examples } from './SizePrefixTransformNode.examples';

export const sizePrefixTransformNode = defineNode('sizePrefixTransformNode', {
    docs: [
        'Precedes the transformed type with a numeric prefix indicating its byte length.',
        'When decoding, the size is read first and determines how many bytes the transformed type may consume.',
    ],
    attributes: [
        attribute('prefix', node('numberTypeNode'), {
            docs: ['The numeric type used as the size prefix.'],
        }),
    ],
    examples,
});
