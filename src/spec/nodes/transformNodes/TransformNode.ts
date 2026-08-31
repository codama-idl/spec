/**
 * Named unions for the transform-node category.
 *
 *  - `transformNode`   every modifier that can be applied to a type node's serialisation.
 */

import { defineUnion } from '../../../api';

export const transformNodeUnion = defineUnion('transformNode', {
    docs: [
        'A modifier applied to the serialisation of the type node that carries it.',
        'Every type node has an optional `transforms` array. Transforms apply in array order, the first being the innermost: a `stringTypeNode` with `transforms: [sentinel, fixedSize]` first delimits the string with the sentinel, then fixes the total byte size — exactly the v1 nesting `fixedSizeTypeNode(sentinelTypeNode(stringTypeNode))` read inside-out.',
    ],
    members: [
        'fixedSizeTransformNode',
        'hiddenPrefixTransformNode',
        'hiddenSuffixTransformNode',
        'postOffsetTransformNode',
        'preOffsetTransformNode',
        'sentinelTransformNode',
        'sizePrefixTransformNode',
    ],
});
