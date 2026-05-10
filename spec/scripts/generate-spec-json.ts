#!/usr/bin/env tsx
/**
 * Emits the canonical `spec-v1.json` artifact from the encoded v1 spec.
 *
 * Run via `pnpm --filter @codama/spec generate`. CI re-runs this and fails
 * the build if the resulting file differs from what's committed, ensuring
 * the JSON artifact and the TypeScript source stay in lockstep.
 */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { getSpec } from '../src/v1';

async function main(): Promise<void> {
    const here = path.dirname(fileURLToPath(import.meta.url));
    // here = <repo>/spec/scripts → repoRoot is two levels up.
    const repoRoot = path.resolve(here, '../..');
    const out = path.join(repoRoot, 'spec-v1.json');
    const spec = getSpec();
    const json = JSON.stringify(spec, null, 4) + '\n';
    await writeFile(out, json, 'utf8');
    const nodeCount = spec.categories.reduce((acc, c) => acc + c.nodes.length, 0);
    const unionCount = spec.categories.reduce((acc, c) => acc + c.unions.length, 0);
    const enumCount = spec.categories.reduce((acc, c) => acc + c.enumerations.length, 0);
    process.stdout.write(
        `wrote ${path.relative(repoRoot, out)} (${nodeCount} nodes, ${unionCount} unions, ${enumCount} enumerations)\n`,
    );
}

main().catch((err: unknown) => {
    process.stderr.write(`generate-spec-json failed: ${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
});
