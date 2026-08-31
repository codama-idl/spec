/**
 * Generator orchestrator.
 *
 * Runs every registered generator sequentially. Each generator exposes
 * a `generate()` function (sync or async) from its `index.ts`, owns its
 * target output paths, and writes its artifacts (`spec.json`, `schema.json`,
 * `docs/`) at the repo root. Each release line hosts exactly one spec major,
 * so the artifacts are unversioned; previous majors live on their own
 * maintenance branches.
 *
 * Adding a new generator: drop a folder under `generators/`, export a
 * `generate()` from its `index.ts`, then register it in the `GENERATORS`
 * list below.
 *
 * Run via `pnpm generate`. The generators execute straight from the
 * TypeScript sources with `tsx`; the preceding `pnpm build` is not consumed
 * by them and simply acts as an extra compile check.
 */

import process from 'node:process';

import { generate as generateDocs } from './docs/index';
import { generate as generateJsonSchema } from './json-schema/index';
import { generate as generateJsonSpec } from './json-spec/index';

type Generator = {
    name: string;
    /** Sync is allowed - the fragments render-map writers are sync. */
    generate: () => Promise<void> | void;
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
