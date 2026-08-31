import { array, attribute, defineNode, node } from '../../../api';
import { examples } from './HiddenPrefixTransformNode.examples';

export const hiddenPrefixTransformNode = defineNode('hiddenPrefixTransformNode', {
    docs: [
        'Prefixes the transformed type with a list of constant values that are written and read but not surfaced as fields to consumers.',
        'When decoding, the prefixed constants are consumed and checked against their expected values before being discarded.',
    ],
    attributes: [
        attribute('prefix', array(node('constantValueNode')), {
            docs: ['The constant values written before the transformed type, in order.'],
        }),
    ],
    examples,
});
