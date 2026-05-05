/**
 * Named unions for the type-node category.
 *
 *  - `StandaloneTypeNode`     all type nodes that can stand alone as a type.
 *  - `EnumVariantTypeNode`    the three flavours of enum variant.
 *  - `RegisteredTypeNode`     every type-shaped node, including variants and struct fields.
 *  - `TypeNode`               StandaloneTypeNode + DefinedTypeLinkNode (the composable form).
 */

import { defineUnion, union } from '../../../api';

const STANDALONE_TYPE_NODE_KINDS = [
    'amountTypeNode',
    'arrayTypeNode',
    'booleanTypeNode',
    'bytesTypeNode',
    'dateTimeTypeNode',
    'enumTypeNode',
    'fixedSizeTypeNode',
    'hiddenPrefixTypeNode',
    'hiddenSuffixTypeNode',
    'mapTypeNode',
    'numberTypeNode',
    'optionTypeNode',
    'postOffsetTypeNode',
    'preOffsetTypeNode',
    'publicKeyTypeNode',
    'remainderOptionTypeNode',
    'sentinelTypeNode',
    'setTypeNode',
    'sizePrefixTypeNode',
    'solAmountTypeNode',
    'stringTypeNode',
    'structTypeNode',
    'tupleTypeNode',
    'zeroableOptionTypeNode',
] as const;

export const standaloneTypeNodeUnion = defineUnion('StandaloneTypeNode', {
    docs: 'Every type node that can be used as a top-level type.',
    members: [...STANDALONE_TYPE_NODE_KINDS],
});

export const enumVariantTypeNodeUnion = defineUnion('EnumVariantTypeNode', {
    docs: 'The variant flavours of an `enumTypeNode`.',
    members: ['enumEmptyVariantTypeNode', 'enumStructVariantTypeNode', 'enumTupleVariantTypeNode'],
});

export const typeNodeUnion = defineUnion('TypeNode', {
    docs: 'The composable form: any standalone type, or a reference to a defined type via `definedTypeLinkNode`.',
    members: [union('StandaloneTypeNode'), 'definedTypeLinkNode'],
});

export const registeredTypeNodeUnion = defineUnion('RegisteredTypeNode', {
    docs: 'Every node tagged as a type-shaped node, including variants and struct fields.',
    members: [union('StandaloneTypeNode'), union('EnumVariantTypeNode'), 'structFieldTypeNode'],
});
