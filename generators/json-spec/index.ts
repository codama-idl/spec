/**
 * `json-spec` generator.
 *
 * Emits the canonical `spec.json` artifact from the encoded spec.
 * CI re-runs this and fails the build if the resulting file differs from
 * what's committed, ensuring the JSON artifact and the TypeScript source
 * stay in lockstep.
 *
 * Each release line hosts exactly one spec major, so there is exactly one
 * `spec.json`; previous majors live on their own maintenance branches.
 */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { getSpec } from '../../src/spec';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// here = <repo>/generators/json-spec → repoRoot is two levels up.
const REPO_ROOT = path.resolve(HERE, '../..');

export async function generate(): Promise<void> {
    const spec = getSpec();
    const out = path.join(REPO_ROOT, 'spec.json');
    const json = JSON.stringify(spec, null, 4) + '\n';
    await writeFile(out, json, 'utf8');
    const nodeCount = spec.categories.reduce((acc, c) => acc + c.nodes.length, 0);
    const unionCount = spec.categories.reduce((acc, c) => acc + c.unions.length, 0);
    const enumCount = spec.categories.reduce((acc, c) => acc + c.enumerations.length, 0);
    process.stdout.write(
        `wrote ${path.relative(REPO_ROOT, out)} (${nodeCount} nodes, ${unionCount} unions, ${enumCount} enumerations)\n`,
    );
}
