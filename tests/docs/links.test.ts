import { describe, expect, it } from 'vitest';

import { relativeMdxLink } from '../../src/docs/links';
import type { NavEntry } from '../../src/docs/types';

const entry = (pathSegments: string[]): NavEntry => ({ ref: { kind: 'rootIndex' }, pathSegments });

describe('relativeMdxLink', () => {
    it('links a sibling page with a ./ prefix and .mdx suffix', () => {
        expect(relativeMdxLink(entry(['a', 'X']), entry(['a', 'Y']))).toBe('./Y.mdx');
    });

    it('climbs out of a subfolder to a root page', () => {
        expect(relativeMdxLink(entry(['a', 'X']), entry(['index']))).toBe('../index.mdx');
    });

    it('descends into a subfolder from a root page', () => {
        expect(relativeMdxLink(entry(['index']), entry(['a', 'Y']))).toBe('./a/Y.mdx');
    });

    it('links across two subfolders', () => {
        expect(relativeMdxLink(entry(['a', 'X']), entry(['b', 'Y']))).toBe('../b/Y.mdx');
    });
});
