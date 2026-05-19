import { countNodeUnion, registeredCountNodeUnion } from './CountNode';
import { fixedCountNode } from './FixedCountNode';
import { prefixedCountNode } from './PrefixedCountNode';
import { remainderCountNode } from './RemainderCountNode';

export const ALL_COUNT_NODES = [fixedCountNode, prefixedCountNode, remainderCountNode] as const;

export const ALL_COUNT_NODE_UNIONS = [registeredCountNodeUnion, countNodeUnion] as const;
