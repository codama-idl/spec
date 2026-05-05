import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { readManifestVersion, writeManifestVersion } from '../src/manifests.js';

describe('manifests', () => {
    let dir: string;

    beforeEach(async () => {
        dir = await mkdtemp(path.join(tmpdir(), 'codama-release-'));
    });

    afterEach(async () => {
        await (await import('node:fs/promises')).rm(dir, { recursive: true, force: true });
    });

    it('reads and writes JS package versions', async () => {
        const file = path.join(dir, 'package.json');
        await writeFile(file, JSON.stringify({ name: 'p', version: '1.2.3' }, null, 4) + '\n', 'utf8');
        expect(await readManifestVersion(file, 'js')).toBe('1.2.3');
        await writeManifestVersion(file, 'js', '1.3.0');
        expect(await readManifestVersion(file, 'js')).toBe('1.3.0');
    });

    it('writes Cargo.toml versions without reformatting', async () => {
        const file = path.join(dir, 'Cargo.toml');
        const original = `[package]
name = "codama-nodes"
description = "the spec"
version = "0.9.2"
edition = "2021"

[dependencies]
serde = "1.0"
`;
        await writeFile(file, original, 'utf8');
        expect(await readManifestVersion(file, 'rust')).toBe('0.9.2');
        await writeManifestVersion(file, 'rust', '0.10.0');
        const after = await readFile(file, 'utf8');
        expect(after).toBe(`[package]
name = "codama-nodes"
description = "the spec"
version = "0.10.0"
edition = "2021"

[dependencies]
serde = "1.0"
`);
    });

    it('does not pick up version lines outside the [package] section', async () => {
        const file = path.join(dir, 'Cargo.toml');
        const original = `[package]
name = "codama-nodes"
version = "0.9.2"

[dependencies]
codama-nodes-derive = { version = "0.9.2", path = "../codama-nodes-derive" }
`;
        await writeFile(file, original, 'utf8');
        await writeManifestVersion(file, 'rust', '0.10.0');
        const after = await readFile(file, 'utf8');
        expect(after).toContain('version = "0.10.0"');
        expect(after).toContain('codama-nodes-derive = { version = "0.9.2"');
    });

    it('throws if Cargo.toml has no [package].version', async () => {
        const file = path.join(dir, 'Cargo.toml');
        await writeFile(file, '[workspace]\nresolver = "2"\n', 'utf8');
        await expect(readManifestVersion(file, 'rust')).rejects.toThrow(/inline \[package\]\.version/);
    });
});
