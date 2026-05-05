/**
 * Named unions for the link-node category.
 */

import { defineUnion, union } from '../../../api';

export const registeredLinkNodeUnion = defineUnion('RegisteredLinkNode', {
    docs: 'Every node tagged as a link to another part of the IDL.',
    members: [
        'accountLinkNode',
        'definedTypeLinkNode',
        'instructionAccountLinkNode',
        'instructionArgumentLinkNode',
        'instructionLinkNode',
        'pdaLinkNode',
        'programLinkNode',
    ],
});

export const linkNodeUnion = defineUnion('LinkNode', {
    docs: 'The composable form: any registered link node.',
    members: [union('RegisteredLinkNode')],
});
