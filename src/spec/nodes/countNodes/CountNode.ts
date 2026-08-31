import { defineUnion, union } from '../../../api';

export const registeredCountNodeUnion = defineUnion('registeredCountNode', {
    docs: ['Every node tagged as a count strategy.'],
    members: ['fixedCountNode', 'prefixedCountNode', 'remainderCountNode'],
});

export const countNodeUnion = defineUnion('countNode', {
    docs: ['The composable form: any registered count node.'],
    members: [union('registeredCountNode')],
});
