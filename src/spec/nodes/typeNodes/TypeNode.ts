/**
 * Named unions for the type-node category.
 *
 *  - `standaloneTypeNode`     all type nodes that can stand alone as a type.
 *  - `registeredTypeNode`     every type-shaped node, including variants and struct fields.
 *  - `typeNode`               standaloneTypeNode + definedTypeLinkNode (the composable form).
 */

import { defineUnion, union } from '../../../api';

const STANDALONE_TYPE_NODE_KINDS = [
    'arrayTypeNode',
    'booleanTypeNode',
    'bytesTypeNode',
    'dateTimeTypeNode',
    'durationTypeNode',
    'enumTypeNode',
    'fixedPointTypeNode',
    'floatTypeNode',
    'integerTypeNode',
    'mapTypeNode',
    'optionTypeNode',
    'publicKeyTypeNode',
    'remainderOptionTypeNode',
    'setTypeNode',
    'stringTypeNode',
    'structTypeNode',
    'tupleTypeNode',
    'zeroableOptionTypeNode',
] as const;

export const standaloneTypeNodeUnion = defineUnion('standaloneTypeNode', {
    docs: ['Every type node that can be used as a top-level type.'],
    members: [...STANDALONE_TYPE_NODE_KINDS],
});

export const typeNodeUnion = defineUnion('typeNode', {
    docs: ['The composable form: any standalone type, or a reference to a defined type via `definedTypeLinkNode`.'],
    members: [union('standaloneTypeNode'), 'definedTypeLinkNode'],
});

export const registeredTypeNodeUnion = defineUnion('registeredTypeNode', {
    docs: ['Every node tagged as a type-shaped node, including variants and struct fields.'],
    members: [union('standaloneTypeNode'), 'enumVariantTypeNode', 'structFieldTypeNode'],
});
