/**
 * `docs` generator.
 *
 * Runs the docs generator over the v1 spec, then writes the emitted mdx tree to
 * `v1/docs/` (plain page bodies, relative `.mdx` links, `index` basenames). CI re-runs this and fails if
 * the result differs from what is committed, keeping the docs artifact in lockstep with the spec source.
 */

import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { generateDocs } from '../../src/docs';
import { getSpec } from '../../src/v1';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// here = <repo>/generators/docs -> repoRoot is two levels up.
const REPO_ROOT = path.resolve(HERE, '../..');

export async function generate(): Promise<void> {
    const model = generateDocs(getSpec());
    const outDir = path.join(REPO_ROOT, 'v1', 'docs');
    // clear first so removed/renamed nodes never leave orphaned files behind
    await rm(outDir, { recursive: true, force: true });
    for (const page of model.pages) {
        const abs = path.join(outDir, `${page.pathSegments.join('/')}.mdx`);
        await mkdir(path.dirname(abs), { recursive: true });
        // core `content` carries no trailing newline; add one when writing the file
        await writeFile(abs, `${page.content}\n`, 'utf8');
    }
    process.stdout.write(`wrote ${model.pages.length} docs files to v1/docs\n`);
}
