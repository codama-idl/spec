import { describe, expect, it } from 'vitest';

import { maxBump, parseIntent } from '../src/intent.js';

describe('parseIntent', () => {
    it('parses package bumps', () => {
        const source = `---
'js::@codama/nodes': minor
'rust::codama-nodes': patch
---

Adopt spec 1.7.0.
`;
        const intent = parseIntent('a.md', source);
        expect(intent.packageBumps.get('js::@codama/nodes')).toBe('minor');
        expect(intent.packageBumps.get('rust::codama-nodes')).toBe('patch');
        expect(intent.specBump).toBeUndefined();
        expect(intent.body).toBe('Adopt spec 1.7.0.');
    });

    it('parses the spec auto-propagation shortcut', () => {
        const source = `---
spec: minor
---

Add new field.
`;
        const intent = parseIntent('a.md', source);
        expect(intent.specBump).toBe('minor');
        expect(intent.packageBumps.size).toBe(0);
    });

    it('rejects packages without ecosystem prefix', () => {
        const source = `---
'@codama/nodes': minor
---

Body.
`;
        expect(() => parseIntent('a.md', source)).toThrow(/missing an ecosystem prefix/);
    });

    it('rejects invalid bump levels', () => {
        const source = `---
'js::@codama/nodes': huge
---

Body.
`;
        expect(() => parseIntent('a.md', source)).toThrow(/invalid bump/);
    });

    it('rejects empty intent files', () => {
        const source = `---

---

Body.
`;
        expect(() => parseIntent('a.md', source)).toThrow(/empty or invalid frontmatter/);
    });

    it('rejects intent files with no declarations at all', () => {
        const source = `---
description: nothing
---

Body.
`;
        expect(() => parseIntent('a.md', source)).toThrow(/missing an ecosystem prefix/);
    });

    it('rejects intent files without frontmatter', () => {
        expect(() => parseIntent('a.md', 'no frontmatter here')).toThrow(/missing YAML frontmatter/);
    });
});

describe('maxBump', () => {
    it('orders patch < minor < major', () => {
        expect(maxBump('patch', 'minor')).toBe('minor');
        expect(maxBump('minor', 'major')).toBe('major');
        expect(maxBump('patch', 'major')).toBe('major');
        expect(maxBump('patch', 'patch')).toBe('patch');
    });
});
