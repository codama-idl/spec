/**
 * Named unions for the display-node category.
 *
 * Display nodes are slotted via specific `display` attributes on host
 * nodes (e.g. `instructionNode.display: instructionDisplayNode`), so no
 * single "any display node" slot is needed. The registered union exists
 * for discovery and for visitor/codegen targets that iterate the
 * category as a whole.
 */

import { defineUnion, union } from '../../../api';

export const registeredDisplayNodeUnion = defineUnion('registeredDisplayNode', {
    docs: ['Every node tagged as display metadata.'],
    members: [
        'enumVariantDisplayNode',
        'instructionAccountDisplayNode',
        'instructionDisplayNode',
        'structFieldDisplayNode',
    ],
});

export const displayNodeUnion = defineUnion('displayNode', {
    docs: ['The composable form: any registered display node.'],
    members: [union('registeredDisplayNode')],
});
