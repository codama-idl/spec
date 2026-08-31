import type { AttributeSpec } from '../../../api';
import { array, optionalAttribute, union } from '../../../api';
import { fixedSizeTransformNode } from './FixedSizeTransformNode';
import { hiddenPrefixTransformNode } from './HiddenPrefixTransformNode';
import { hiddenSuffixTransformNode } from './HiddenSuffixTransformNode';
import { postOffsetTransformNode } from './PostOffsetTransformNode';
import { preOffsetTransformNode } from './PreOffsetTransformNode';
import { sentinelTransformNode } from './SentinelTransformNode';
import { sizePrefixTransformNode } from './SizePrefixTransformNode';
import { transformNodeUnion } from './TransformNode';

export const ALL_TRANSFORM_NODES = [
    fixedSizeTransformNode,
    hiddenPrefixTransformNode,
    hiddenSuffixTransformNode,
    postOffsetTransformNode,
    preOffsetTransformNode,
    sentinelTransformNode,
    sizePrefixTransformNode,
] as const;

export const ALL_TRANSFORM_NODE_UNIONS = [transformNodeUnion] as const;

/**
 * The `transforms` attribute declared by every member of the `typeNode`
 * union. Declared once here so all type nodes share the exact same shape
 * and documentation.
 */
export function transformsAttribute(): AttributeSpec {
    return optionalAttribute('transforms', array(union('transformNode')), {
        docs: ['Transforms applied to the serialisation of this type, in order — the first is the innermost.'],
    });
}
