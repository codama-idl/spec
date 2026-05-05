/**
 * `gen-json-schema`
 *
 * Emits the public `codama.schema.json` JSON Schema artifact from the encoded
 * spec for use by editor tooling and third-party consumers.
 *
 * Implementation pending.
 */

export async function generate(): Promise<void> {
    throw new Error('gen-json-schema is not implemented yet.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
    await generate();
}
