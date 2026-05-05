import { describe, expectTypeOf, it } from 'vitest';

import type { AccountNode, Node, NodeKind, RootNode } from '../src/index';

describe('@codama/node-types', () => {
    it('exports the master Node union and NodeKind helper', () => {
        expectTypeOf<NodeKind>().toEqualTypeOf<Node['kind']>();
    });

    it('exposes the AccountNode interface with its kind discriminator', () => {
        expectTypeOf<AccountNode['kind']>().toEqualTypeOf<'accountNode'>();
    });

    it('exposes the RootNode interface with its kind discriminator', () => {
        expectTypeOf<RootNode['kind']>().toEqualTypeOf<'rootNode'>();
    });
});
