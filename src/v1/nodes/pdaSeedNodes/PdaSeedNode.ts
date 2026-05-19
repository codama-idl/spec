/**
 * Named unions for the PDA-seed-node category.
 *
 * `ConstantPdaSeedValue` captures the inline `ProgramIdValueNode | ValueNode`
 * union used as the `value` attribute of `constantPdaSeedNode`.
 */

import { defineUnion, union } from '../../../api';

export const registeredPdaSeedNodeUnion = defineUnion('RegisteredPdaSeedNode', {
    docs: ['Every node tagged as a PDA seed.'],
    members: ['constantPdaSeedNode', 'variablePdaSeedNode'],
});

export const pdaSeedNodeUnion = defineUnion('PdaSeedNode', {
    docs: ['The composable form: any registered PDA seed node.'],
    members: [union('RegisteredPdaSeedNode')],
});

export const constantPdaSeedValueUnion = defineUnion('ConstantPdaSeedValue', {
    docs: ['The value forms a `constantPdaSeedNode` may carry — either a literal value or the program ID placeholder.'],
    members: ['programIdValueNode', union('ValueNode')],
});
