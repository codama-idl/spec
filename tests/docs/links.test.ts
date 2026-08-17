import { describe, expect, it } from 'vitest';

import { relativePageLink } from '../../src/docs/links';
import type { NavEntry } from '../../src/docs/types';

const entry = (pathSegments: string[]): NavEntry => ({ ref: { kind: 'rootIndex' }, pathSegments });

describe('relativePageLink', () => {
    it('links a sibling page with a ./ prefix and .md suffix', () => {
        expect(relativePageLink(entry(['a', 'X']), entry(['a', 'Y']))).toBe('./Y.md');
    });

    it('climbs out of a subfolder to a root page', () => {
        expect(relativePageLink(entry(['a', 'X']), entry(['README']))).toBe('../README.md');
    });

    it('descends into a subfolder from a root page', () => {
        expect(relativePageLink(entry(['README']), entry(['a', 'Y']))).toBe('./a/Y.md');
    });

    it('links across two subfolders', () => {
        expect(relativePageLink(entry(['a', 'X']), entry(['b', 'Y']))).toBe('../b/Y.md');
    });
});
