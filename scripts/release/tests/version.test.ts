import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { runVersion } from '../src/commands/version.js';
import { loadConfig } from '../src/config.js';

/**
 * End-to-end test: drops a synthetic intent corpus into a temp workspace
 * matching the real repo layout and verifies the full `runVersion` pipeline
 * — version bumps, CHANGELOG generation, COMPATIBILITY.md regeneration,
 * intent file consumption — all behave as expected together.
 */

interface Workspace {
    root: string;
    pkgFile: (relativeDir: string) => string;
    cargoFile: (relativeDir: string) => string;
    intentFile: (name: string) => string;
}

async function makeWorkspace(): Promise<Workspace> {
    const root = await mkdtemp(path.join(tmpdir(), 'codama-release-e2e-'));

    const writeJson = async (relPath: string, data: unknown) => {
        const file = path.join(root, relPath);
        await mkdir(path.dirname(file), { recursive: true });
        await writeFile(file, JSON.stringify(data, null, 4) + '\n', 'utf8');
    };

    const writeText = async (relPath: string, body: string) => {
        const file = path.join(root, relPath);
        await mkdir(path.dirname(file), { recursive: true });
        await writeFile(file, body, 'utf8');
    };

    // The spec package: not "generated" but special-cased in auto-propagation.
    await writeJson('spec/package.json', {
        name: '@codama/spec',
        version: '1.6.0',
        codama: { spec: '1.6.0' },
    });

    // Two generated JS packages: should auto-propagate from `spec: <level>`.
    await writeJson('js/node-types/package.json', {
        name: '@codama/node-types',
        version: '1.6.0',
        codama: { spec: '1.6.0', generated: true },
    });
    await writeJson('js/nodes/package.json', {
        name: '@codama/nodes',
        version: '1.6.0',
        codama: { spec: '1.6.0', generated: true },
    });

    // One generated Rust crate: auto-propagates from spec.
    await writeText(
        'rust/codama-nodes/Cargo.toml',
        `[package]
name = "codama-nodes"
version = "0.9.2"

[package.metadata.codama]
spec = "1.6.0"
generated = true
`,
    );

    // One hand-written Rust crate: does NOT auto-propagate from spec.
    await writeText(
        'rust/codama-nodes-derive/Cargo.toml',
        `[package]
name = "codama-nodes-derive"
version = "0.9.2"

[package.metadata.codama]
spec = "1.6.0"
`,
    );

    await mkdir(path.join(root, '.changeset'), { recursive: true });
    await writeText('COMPATIBILITY.md', '# Compatibility matrix\n\n(placeholder)\n');

    return {
        root,
        pkgFile: (relDir: string) => path.join(root, relDir, 'package.json'),
        cargoFile: (relDir: string) => path.join(root, relDir, 'Cargo.toml'),
        intentFile: (name: string) => path.join(root, '.changeset', name),
    };
}

async function readJson<T>(file: string): Promise<T> {
    return JSON.parse(await readFile(file, 'utf8')) as T;
}

async function readVersionFromCargoToml(file: string): Promise<string> {
    const raw = await readFile(file, 'utf8');
    const match = /\n\s*version\s*=\s*"([^"]+)"/.exec('\n' + raw);
    if (!match) throw new Error(`No version in ${file}`);
    return match[1];
}

async function fileExists(file: string): Promise<boolean> {
    try {
        await readFile(file);
        return true;
    } catch {
        return false;
    }
}

describe('runVersion (end-to-end)', () => {
    let ws: Workspace;

    beforeEach(async () => {
        ws = await makeWorkspace();
    });

    afterEach(async () => {
        await rm(ws.root, { recursive: true, force: true });
    });

    it('applies spec auto-propagation, explicit bumps, and consumes intents', async () => {
        // Two intent files: a spec-bump shortcut, and an explicit Rust patch
        // on the hand-written crate (which is NOT touched by auto-propagation).
        await writeFile(
            ws.intentFile('spec-bump.md'),
            `---
spec: minor
---

Add a hypothetical \`xyz\` field on \`AccountNode\`.
`,
            'utf8',
        );
        await writeFile(
            ws.intentFile('derive-fix.md'),
            `---
'rust::codama-nodes-derive': patch
---

Refactor an internal helper in the proc-macro.
`,
            'utf8',
        );

        const config = await loadConfig(ws.root);
        await runVersion(config);

        // === Versions bumped as expected ===
        expect((await readJson<{ version: string }>(ws.pkgFile('spec'))).version).toBe('1.7.0');
        expect((await readJson<{ version: string }>(ws.pkgFile('js/node-types'))).version).toBe('1.7.0');
        expect((await readJson<{ version: string }>(ws.pkgFile('js/nodes'))).version).toBe('1.7.0');
        expect(await readVersionFromCargoToml(ws.cargoFile('rust/codama-nodes'))).toBe('0.10.0');
        expect(await readVersionFromCargoToml(ws.cargoFile('rust/codama-nodes-derive'))).toBe('0.9.3');

        // === Per-package CHANGELOG.md files created with entry bodies ===
        const specChangelog = await readFile(path.join(ws.root, 'spec/CHANGELOG.md'), 'utf8');
        expect(specChangelog).toContain('## [1.7.0]');
        expect(specChangelog).toContain('### Minor changes');
        expect(specChangelog).toContain('Add a hypothetical `xyz` field on `AccountNode`');

        const nodeTypesChangelog = await readFile(path.join(ws.root, 'js/node-types/CHANGELOG.md'), 'utf8');
        expect(nodeTypesChangelog).toContain('## [1.7.0]');
        expect(nodeTypesChangelog).toContain('Add a hypothetical `xyz` field on `AccountNode`');

        const nodesChangelog = await readFile(path.join(ws.root, 'js/nodes/CHANGELOG.md'), 'utf8');
        expect(nodesChangelog).toContain('## [1.7.0]');

        const codamaNodesChangelog = await readFile(path.join(ws.root, 'rust/codama-nodes/CHANGELOG.md'), 'utf8');
        expect(codamaNodesChangelog).toContain('## [0.10.0]');
        expect(codamaNodesChangelog).toContain('### Minor changes');

        const deriveChangelog = await readFile(path.join(ws.root, 'rust/codama-nodes-derive/CHANGELOG.md'), 'utf8');
        expect(deriveChangelog).toContain('## [0.9.3]');
        expect(deriveChangelog).toContain('### Patch changes');
        expect(deriveChangelog).toContain('Refactor an internal helper in the proc-macro');

        // === COMPATIBILITY.md regenerated with new versions ===
        const compat = await readFile(path.join(ws.root, 'COMPATIBILITY.md'), 'utf8');
        expect(compat).toContain('| `@codama/spec` | `1.7.0` | `1.6.0` |');
        expect(compat).toContain('| `@codama/node-types` | `1.7.0` | `1.6.0` |');
        expect(compat).toContain('| `@codama/nodes` | `1.7.0` | `1.6.0` |');
        expect(compat).toContain('| `codama-nodes` | `0.10.0` | `1.6.0` |');
        expect(compat).toContain('| `codama-nodes-derive` | `0.9.3` | `1.6.0` |');

        // === Both intent files consumed ===
        expect(await fileExists(ws.intentFile('spec-bump.md'))).toBe(false);
        expect(await fileExists(ws.intentFile('derive-fix.md'))).toBe(false);
    });

    it('is a no-op when there are no intent files', async () => {
        const config = await loadConfig(ws.root);
        await runVersion(config);

        // Versions unchanged.
        expect((await readJson<{ version: string }>(ws.pkgFile('spec'))).version).toBe('1.6.0');
        expect(await readVersionFromCargoToml(ws.cargoFile('rust/codama-nodes'))).toBe('0.9.2');

        // No CHANGELOG files created.
        expect(await fileExists(path.join(ws.root, 'spec/CHANGELOG.md'))).toBe(false);
        expect(await fileExists(path.join(ws.root, 'rust/codama-nodes/CHANGELOG.md'))).toBe(false);

        // COMPATIBILITY.md left as-is (we don't even touch it on the no-op path).
        const compat = await readFile(path.join(ws.root, 'COMPATIBILITY.md'), 'utf8');
        expect(compat).toBe('# Compatibility matrix\n\n(placeholder)\n');
    });
});
