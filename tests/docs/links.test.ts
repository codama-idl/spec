import { posix } from 'node:path';

import { describe, expect, it } from 'vitest';

import { absoluteLinks, relativeLinks } from '../../src/docs/links';
import type { NavEntry } from '../../src/docs/types';

function entry(pathSegments: string[]): NavEntry {
    return { ref: { kind: 'rootIndex' }, pathSegments };
}

// reference computation using the node:path implementation we removed from the source
function nodeRelative(from: string[], to: string[], extension: string): string {
    let rel = posix.relative(posix.dirname(from.join('/')), to.join('/'));
    if (!rel.startsWith('.')) {
        rel = `./${rel}`;
    }
    return `${rel}${extension ? `.${extension}` : ''}`;
}

// parity shapes: same dir, one/two up, disjoint trees, pure descent, and self-link
const parityCases = (
    [
        [['a'], ['b']],
        [['a'], ['dir', 'b']],
        [['dir', 'a'], ['b']],
        [
            ['dir', 'a'],
            ['dir', 'b'],
        ],
        [
            ['dir', 'a'],
            ['other', 'b'],
        ],
        [
            ['x', 'y', 'a'],
            ['x', 'y', 'b'],
        ],
        [
            ['x', 'y', 'a'],
            ['x', 'z', 'b'],
        ],
        [
            ['x', 'y', 'a'],
            ['p', 'q', 'b'],
        ],
        [
            ['x', 'y', 'z', 'a'],
            ['x', 'b'],
        ],
        [
            ['x', 'a'],
            ['x', 'y', 'z', 'b'],
        ],
        [['a'], ['a']],
    ] as Array<[from: string[], to: string[]]>
).map(([from, to]) => ({ from, to, name: `${from.join('/')} -> ${to.join('/')}` }));

describe('relativeLinks', () => {
    const rel = relativeLinks('md');
    it('resolves a cross-category up-link', () => {
        expect(rel(entry(['pdaSeedNodes', 'ConstantPdaSeedNode']), entry(['typeNodes', 'TypeNode']))).toBe(
            '../typeNodes/TypeNode.md',
        );
    });
    it('resolves a same-folder link with a ./ prefix', () => {
        expect(
            rel(entry(['pdaSeedNodes', 'ConstantPdaSeedNode']), entry(['pdaSeedNodes', 'ConstantPdaSeedValue'])),
        ).toBe('./ConstantPdaSeedValue.md');
    });
    it('resolves a root-page down-link into a subfolder', () => {
        expect(rel(entry(['PdaNode']), entry(['pdaSeedNodes', 'PdaSeedNode']))).toBe('./pdaSeedNodes/PdaSeedNode.md');
    });
    it('resolves a subfolder up-link to a root page', () => {
        expect(rel(entry(['pdaSeedNodes', 'ConstantPdaSeedNode']), entry(['RootNode']))).toBe('../RootNode.md');
    });
    it('resolves a link between two root pages', () => {
        expect(rel(entry(['PdaNode']), entry(['TypeNode']))).toBe('./TypeNode.md');
    });
    it('resolves a link to the page itself', () => {
        expect(rel(entry(['typeNodes', 'TypeNode']), entry(['typeNodes', 'TypeNode']))).toBe('./TypeNode.md');
    });
    it('handles deep nesting - same dir, one up, and disjoint trees', () => {
        expect(rel(entry(['a', 'b', 'X']), entry(['a', 'b', 'Y']))).toBe('./Y.md');
        expect(rel(entry(['a', 'b', 'X']), entry(['a', 'c', 'Y']))).toBe('../c/Y.md');
        expect(rel(entry(['a', 'b', 'X']), entry(['d', 'e', 'Y']))).toBe('../../d/e/Y.md');
        expect(rel(entry(['a', 'b', 'c', 'X']), entry(['a', 'Y']))).toBe('../../Y.md');
    });
    it('normalizes a leading-dot extension', () => {
        expect(relativeLinks('.md')(entry(['PdaNode']), entry(['TypeNode']))).toBe('./TypeNode.md');
    });
    it('omits the suffix when the extension is empty', () => {
        expect(relativeLinks('')(entry(['pdaSeedNodes', 'X']), entry(['typeNodes', 'T']))).toBe('../typeNodes/T');
    });
    // the browser-safe posixRelative must match Node's real posix.relative for every shape
    it.each(parityCases)('matches node:path posix.relative: $name', ({ from, to }) => {
        expect(relativeLinks('md')(entry(from), entry(to))).toBe(nodeRelative(from, to, 'md'));
    });
});

describe('absoluteLinks', () => {
    const abs = absoluteLinks({ baseUrl: '/docs/v1' });
    it('emits a route-absolute href and ignores the from-entry', () => {
        expect(abs(entry(['anything']), entry(['type-nodes', 'type-node']))).toBe('/docs/v1/type-nodes/type-node');
    });
    it('trims a trailing slash on baseUrl and appends an optional extension', () => {
        expect(absoluteLinks({ baseUrl: '/docs/v1/', extension: 'mdx' })(entry(['x']), entry(['a', 'b']))).toBe(
            '/docs/v1/a/b.mdx',
        );
    });
    it('trims multiple trailing slashes and normalizes a leading-dot extension', () => {
        expect(absoluteLinks({ baseUrl: '/docs/v1///', extension: '.mdx' })(entry(['x']), entry(['a', 'b']))).toBe(
            '/docs/v1/a/b.mdx',
        );
    });
});
