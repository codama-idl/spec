/**
 * Named unions for the display-node category.
 *
 * Display nodes are slotted via specific `display` attributes on host
 * nodes (e.g. `instructionNode.display: instructionDisplayNode`), so no
 * single "any display node" slot is needed. The registered union exists
 * for discovery and for visitor/codegen targets that iterate the
 * category as a whole.
 *
 * The `numberDisplayNode` union groups the presentation forms an integer
 * may take; raw rendering is expressed by the absence of a display
 * attribute. Floats and fixed-points host `unitNumberDisplayNode`
 * directly — scaling forms cannot apply to numbers whose scale is
 * already fixed. Time semantics live on the type layer
 * (`dateTimeTypeNode`, `durationTypeNode`).
 */

import { defineUnion, union } from '../../../api';

export const numberDisplayNodeUnion = defineUnion('numberDisplayNode', {
    docs: [
        'The presentation forms a number may take. Raw rendering is expressed by the absence of a display attribute.',
    ],
    members: ['amountNumberDisplayNode', 'unitNumberDisplayNode'],
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
        'unitNumberDisplayNode',
    ],
});

export const displayNodeUnion = defineUnion('displayNode', {
    docs: ['The composable form: any registered display node.'],
    members: [union('registeredDisplayNode')],
});
