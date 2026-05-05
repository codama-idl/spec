#!/usr/bin/env tsx
/**
 * v1 driver for `gen-ts-node-types` — emits the `@codama/node-types`
 * package source from the Codama v1 spec.
 *
 * This file is the per-major glue: it owns the v1-specific compatibility
 * tables (`NARROWABLE_DATA_ATTRIBUTES`, `GENERIC_PARAM_ORDER`) needed to
 * keep the generated surface in lockstep with the legacy
 * `@codama/node-types` package, then hands everything to the
 * version-agnostic `generate(spec, options)` orchestrator.
 *
 * Recommended entry: run `pnpm generate` from the repo root, which
 * rebuilds `@codama/spec` first, regenerates `spec-v1.json`, then runs
 * this driver. Direct invocation via
 * `pnpm --filter @codama-internal/gen-ts-node-types generate` is also
 * supported and rebuilds `@codama/spec` for safety.
 *
 * Output: `js/node-types/src/generated/**`, fully replacing whatever was
 * there. The directory is wiped before each run so stale files cannot
 * survive.
 *
 * A future v2 driver (`v2.ts`) will live alongside this file and supply
 * its own tables / output dir, calling the same `generate` function.
 */

import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { getSpec } from '@codama/spec';

import { generate } from './generate';

/**
 * Data attributes that should be lifted to a generic param even though
 * the spec classifies them as data. Each entry preserves a narrowing
 * form supported by the legacy `@codama/node-types` interface — e.g.
 * `NumberTypeNode<'u32'>`, `StringTypeNode<'utf8'>` — that downstream
 * constructors in `@codama/nodes` rely on.
 */
const NARROWABLE_DATA_ATTRIBUTES: ReadonlySet<string> = new Set(['numberTypeNode:format', 'stringTypeNode:encoding']);

/**
 * Per-node override of the generic-parameter emission order. Used to
 * keep positional generic args backward-compatible with the legacy
 * `@codama/node-types` package: legacy generics keep their original
 * positions, any extra generics our renderer adds appear at the end.
 */
const GENERIC_PARAM_ORDER: ReadonlyMap<string, readonly string[]> = new Map([
    // Legacy `ProgramNode<TPdas, TAccounts, ...>` listed `pdas` first.
    ['programNode', ['pdas', 'accounts', 'instructions', 'definedTypes', 'errors', 'events', 'constants']],
    // Legacy `PdaValueNode<TSeeds, TProgram>`. Our renderer lifts `pda`
    // too; placing it last keeps positional generics backward-compatible.
    ['pdaValueNode', ['seeds', 'programId', 'pda']],
    // Legacy `InstructionArgumentNode<TDefaultValue>`. Our extra `TType`
    // is appended after.
    ['instructionArgumentNode', ['defaultValue', 'type']],
    // Legacy `InstructionNode<TAccounts, TArguments, TExtraArguments,
    // TRemainingAccounts, TByteDeltas, TDiscriminators, TSubInstructions>`.
    // Our extra `TStatus` is appended after.
    [
        'instructionNode',
        [
            'accounts',
            'arguments',
            'extraArguments',
            'remainingAccounts',
            'byteDeltas',
            'discriminators',
            'subInstructions',
            'status',
        ],
    ],
]);

async function main(): Promise<void> {
    const here = path.dirname(fileURLToPath(import.meta.url));
    // here = <repo>/generators/gen-ts-node-types/src → repoRoot is three levels up.
    const repoRoot = path.resolve(here, '../../..');
    const outputDir = path.join(repoRoot, 'js', 'node-types', 'src', 'generated');

    await generate(getSpec(), {
        genericParamOrder: GENERIC_PARAM_ORDER,
        narrowableDataAttributes: NARROWABLE_DATA_ATTRIBUTES,
        outputDir,
        targetSpecMajor: 1,
    });
    process.stdout.write(`generated → ${path.relative(repoRoot, outputDir)}\n`);
}

main().catch((err: unknown) => {
    process.stderr.write(`gen-ts-node-types (v1) failed: ${err instanceof Error ? err.message : String(err)}\n`);
    if (err instanceof Error && err.stack) process.stderr.write(`${err.stack}\n`);
    process.exit(1);
});
