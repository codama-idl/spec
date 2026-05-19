/**
 * `json-spec` generator.
 *
 * Emits the canonical `v1/spec.json` artifact from the encoded v1 spec.
 * CI re-runs this and fails the build if the resulting file differs from
 * what's committed, ensuring the JSON artifact and the TypeScript source
 * stay in lockstep.
 *
 * Future Codama majors add a second `writeSpec('v2', getV2Spec())` line.
 */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import type { Spec } from '../../src/api';
import { getSpec as getV1Spec } from '../../src/v1';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// here = <repo>/generators/json-spec → repoRoot is two levels up.
const REPO_ROOT = path.resolve(HERE, '../..');

async function writeSpec(major: string, spec: Spec): Promise<void> {
    const out = path.join(REPO_ROOT, major, 'spec.json');
    const json = JSON.stringify(spec, null, 4) + '\n';
    await writeFile(out, json, 'utf8');
    const nodeCount = spec.categories.reduce((acc, c) => acc + c.nodes.length, 0);
    const unionCount = spec.categories.reduce((acc, c) => acc + c.unions.length, 0);
    const enumCount = spec.categories.reduce((acc, c) => acc + c.enumerations.length, 0);
    process.stdout.write(
        `wrote ${path.relative(REPO_ROOT, out)} (${nodeCount} nodes, ${unionCount} unions, ${enumCount} enumerations)\n`,
    );
}

export async function generate(): Promise<void> {
    await writeSpec('v1', getV1Spec());
}
