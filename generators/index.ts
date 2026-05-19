/**
 * Generator orchestrator.
 *
 * Runs every registered generator sequentially. Each generator exposes
 * an `async function generate(): Promise<void>` from its `index.ts`,
 * owns its target output paths, and writes to a versioned subfolder
 * (`v1/...`, future `v2/...`, …) at the repo root.
 *
 * Adding a new generator: drop a folder under `generators/`, export a
 * `generate()` from its `index.ts`, then register it in the `GENERATORS`
 * list below.
 *
 * Run via `pnpm generate`, which first rebuilds the package so the
 * generators consume up-to-date sources.
 */

import process from 'node:process';

import { generate as generateDocs } from './docs/index';
import { generate as generateJsonSchema } from './json-schema/index';
import { generate as generateJsonSpec } from './json-spec/index';

type Generator = {
    name: string;
    generate: () => Promise<void>;
};

const GENERATORS: readonly Generator[] = [
    { generate: generateJsonSpec, name: 'json-spec' },
    { generate: generateJsonSchema, name: 'json-schema' },
    { generate: generateDocs, name: 'docs' },
];

async function main(): Promise<void> {
    for (const { name, generate } of GENERATORS) {
        try {
            await generate();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            process.stderr.write(`generator '${name}' failed: ${message}\n`);
            if (err instanceof Error && err.stack) process.stderr.write(`${err.stack}\n`);
            process.exit(1);
        }
    }
}

void main();
