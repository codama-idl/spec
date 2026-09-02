/**
 * Named unions for the display-node category.
 *
 * Display nodes are slotted via specific `display` attributes on host
 * nodes (e.g. `instructionNode.display: instructionDisplayNode`), so no
 * single "any display node" slot is needed. The registered union exists
 * for discovery and for visitor/codegen targets that iterate the
 * category as a whole.
 *
 * The `numberDisplayNode` union groups the presentation forms a number
 * may take; raw rendering is expressed by the absence of a display
 * attribute. It has a single member today — time semantics moved to the
 * type layer (`dateTimeTypeNode`, `durationTypeNode`) — and exists as the
 * growth slot for future presentation forms.
 */

import { defineUnion, union } from '../../../api';

export const numberDisplayNodeUnion = defineUnion('numberDisplayNode', {
    docs: [
        'The presentation forms a number may take. Raw rendering is expressed by the absence of a display attribute.',
    ],
    members: ['amountNumberDisplayNode'],
});

export const registeredDisplayNodeUnion = defineUnion('registeredDisplayNode', {
    docs: ['Every node tagged as display metadata.'],
    members: [
        'amountNumberDisplayNode',
        'enumVariantDisplayNode',
        'instructionAccountDisplayNode',
        'instructionDisplayNode',
        'stringDisplayNode',
        'structFieldDisplayNode',
    ],
});

export const displayNodeUnion = defineUnion('displayNode', {
    docs: ['The composable form: any registered display node.'],
    members: [union('registeredDisplayNode')],
});
