/**
 * `gen-ts-nodes`
 *
 * Emits the generated factory modules of the `@codama/nodes` package from
 * the encoded Codama spec. Hand-written helpers in `js/nodes/src/` are
 * untouched.
 *
 * Implementation pending.
 */

export async function generate(): Promise<void> {
    throw new Error('gen-ts-nodes is not implemented yet.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
    await generate();
}
