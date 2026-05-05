/**
 * `gen-docs`
 *
 * Emits per-node markdown documentation under `docs/` from the encoded spec.
 *
 * Implementation pending.
 */

export async function generate(): Promise<void> {
    throw new Error('gen-docs is not implemented yet.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
    await generate();
}
