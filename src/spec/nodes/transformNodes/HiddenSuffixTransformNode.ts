import { array, attribute, defineNode, node } from '../../../api';
import { examples } from './HiddenSuffixTransformNode.examples';

export const hiddenSuffixTransformNode = defineNode('hiddenSuffixTransformNode', {
    docs: [
        'Suffixes the transformed type with a list of constant values that are written and read but not surfaced as fields to consumers.',
        'When decoding, the suffixed constants are consumed and checked against their expected values before being discarded.',
    ],
    attributes: [
        attribute('suffix', array(node('constantValueNode')), {
            docs: ['The constant values written after the transformed type, in order.'],
        }),
    ],
    examples,
});
