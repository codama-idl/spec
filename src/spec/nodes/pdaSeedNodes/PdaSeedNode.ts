/**
 * Named unions for the PDA-seed-node category.
 *
 * `constantPdaSeedValue` captures the inline `programIdValueNode | valueNode`
 * union used as the `value` attribute of `constantPdaSeedNode`.
 */

import { defineUnion, union } from '../../../api';

export const registeredPdaSeedNodeUnion = defineUnion('registeredPdaSeedNode', {
    docs: ['Every node tagged as a PDA seed.'],
    members: ['constantPdaSeedNode', 'variablePdaSeedNode'],
});

export const pdaSeedNodeUnion = defineUnion('pdaSeedNode', {
    docs: ['The composable form: any registered PDA seed node.'],
    members: [union('registeredPdaSeedNode')],
});

export const constantPdaSeedValueUnion = defineUnion('constantPdaSeedValue', {
    docs: ['The value forms a `constantPdaSeedNode` may carry — either a literal value or the program ID placeholder.'],
    members: ['programIdValueNode', union('valueNode')],
});
