/**
 * Named unions for the value-node category.
 *
 *  - `standaloneValueNode`           every value node usable as a top-level value, including
 *                                    `injectedValueNode` (a value resolved at presentation time).
 *  - `valueNode`                     the composable form (alias for `standaloneValueNode`).
 *  - `registeredValueNode`           every value-shaped node, including container variants like
 *                                    `mapEntryValueNode` and `structFieldValueNode`.
 *  - `injectableIntegerValueNode`    a concrete integer value or a key resolved via injection.
 *  - `injectableUnitValueNode`       a concrete string or address unit, or a key resolved via injection.
 */

import { defineUnion, union } from '../../../api';

const STANDALONE_VALUE_NODE_KINDS = [
    'arrayValueNode',
    'booleanValueNode',
    'bytesValueNode',
    'constantValueNode',
    'enumValueNode',
    'floatValueNode',
    'injectedValueNode',
    'integerValueNode',
    'mapValueNode',
    'noneValueNode',
    'publicKeyValueNode',
    'setValueNode',
    'someValueNode',
    'stringValueNode',
    'structValueNode',
    'tupleValueNode',
] as const;

export const standaloneValueNodeUnion = defineUnion('standaloneValueNode', {
    docs: ['Every value node that can be used as a top-level value.'],
    members: [...STANDALONE_VALUE_NODE_KINDS],
});

export const valueNodeUnion = defineUnion('valueNode', {
    docs: ['The composable form: any standalone value node.'],
    members: [union('standaloneValueNode')],
});

export const registeredValueNodeUnion = defineUnion('registeredValueNode', {
    docs: ['Every node tagged as a value-shaped node, including container variants.'],
    members: [union('standaloneValueNode'), 'mapEntryValueNode', 'structFieldValueNode'],
});

export const injectableIntegerValueNodeUnion = defineUnion('injectableIntegerValueNode', {
    docs: ['A concrete integer value, or a key resolved at presentation time from a surrounding provider.'],
    members: ['integerValueNode', 'injectedValueNode'],
});

export const injectableUnitValueNodeUnion = defineUnion('injectableUnitValueNode', {
    docs: [
        "A unit of measure: a concrete string (e.g. `\"USDC\"`), a concrete address (e.g. a token mint), or a key resolved at presentation time from a surrounding provider to either — e.g. an instruction account's address provided as `providedNode('mint', accountValueNode('mint'))`, or any other contextual value resolving to an address.",
        'Address units are presented under whatever name renderers know for the address (e.g. a token symbol or an alias), and as the address itself otherwise. The `identifier` of a `publicKeyValueNode` is a code symbol, not a display name.',
    ],
    members: ['stringValueNode', 'publicKeyValueNode', 'injectedValueNode'],
});
