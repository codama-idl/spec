import { describe, expect, it } from 'vitest';

import { buildReleasePlan } from '../src/aggregate.js';
import type { PackageInfo, ReleaseConfig } from '../src/config.js';
import { parseIntent } from '../src/intent.js';

function makePackage(overrides: Partial<PackageInfo> & Pick<PackageInfo, 'ecosystem' | 'id' | 'name'>): PackageInfo {
    return {
        dir: '',
        manifestPath: '',
        version: '1.0.0',
        private: false,
        generated: false,
        ...overrides,
    };
}

function makeConfig(packages: PackageInfo[]): ReleaseConfig {
    return {
        repoRoot: '/',
        changesetDir: '/.changeset',
        compatibilityPath: '/COMPATIBILITY.md',
        specJsonPath: '/spec.json',
        packages: new Map(packages.map(p => [p.id, p])),
    };
}

describe('buildReleasePlan', () => {
    it('aggregates explicit per-package bumps and takes the maximum', async () => {
        const config = makeConfig([
            makePackage({ id: 'js::@codama/nodes', name: '@codama/nodes', ecosystem: 'js' }),
            makePackage({ id: 'rust::codama-nodes', name: 'codama-nodes', ecosystem: 'rust' }),
        ]);

        const i1 = parseIntent(
            'a.md',
            `---
'js::@codama/nodes': patch
---

Bug fix.
`,
        );
        const i2 = parseIntent(
            'b.md',
            `---
'js::@codama/nodes': minor
'rust::codama-nodes': minor
---

Add helper.
`,
        );

        const plan = await buildReleasePlan([i1, i2], config);
        expect(plan.packages.get('js::@codama/nodes')?.bump).toBe('minor');
        expect(plan.packages.get('rust::codama-nodes')?.bump).toBe('minor');
        expect(plan.packages.get('js::@codama/nodes')?.contributingIntents.length).toBe(2);
    });

    it('auto-propagates spec bumps to generated packages and the spec package', async () => {
        const config = makeConfig([
            makePackage({ id: 'js::@codama/spec', name: '@codama/spec', ecosystem: 'js' }),
            makePackage({ id: 'js::@codama/node-types', name: '@codama/node-types', ecosystem: 'js', generated: true }),
            makePackage({ id: 'js::@codama/nodes', name: '@codama/nodes', ecosystem: 'js', generated: true }),
            makePackage({ id: 'rust::codama-nodes', name: 'codama-nodes', ecosystem: 'rust', generated: true }),
            makePackage({ id: 'rust::codama-nodes-derive', name: 'codama-nodes-derive', ecosystem: 'rust' }),
        ]);

        const intent = parseIntent(
            'a.md',
            `---
spec: minor
---

Add new node.
`,
        );

        const plan = await buildReleasePlan([intent], config);
        expect(plan.packages.get('js::@codama/spec')?.bump).toBe('minor');
        expect(plan.packages.get('js::@codama/node-types')?.bump).toBe('minor');
        expect(plan.packages.get('js::@codama/nodes')?.bump).toBe('minor');
        expect(plan.packages.get('rust::codama-nodes')?.bump).toBe('minor');
        // Hand-written-only package is not auto-propagated.
        expect(plan.packages.has('rust::codama-nodes-derive')).toBe(false);
    });

    it('warns about intent entries targeting unknown packages', async () => {
        const config = makeConfig([makePackage({ id: 'js::@codama/nodes', name: '@codama/nodes', ecosystem: 'js' })]);
        const intent = parseIntent(
            'a.md',
            `---
'js::@codama/ghost': minor
---

Body.
`,
        );

        const plan = await buildReleasePlan([intent], config);
        expect(plan.warnings.length).toBe(1);
        expect(plan.warnings[0]).toMatch(/@codama\/ghost/);
        expect(plan.packages.size).toBe(0);
    });
});
