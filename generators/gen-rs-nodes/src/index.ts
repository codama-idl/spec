/**
 * `gen-rs-nodes`
 *
 * Emits the generated structs of the `codama-nodes` Rust crate from the
 * encoded Codama spec. Hand-written traits and the `#[node]` proc-macro
 * inputs in `rust/codama-nodes/src/` are untouched.
 *
 * Implementation pending.
 */

export async function generate(): Promise<void> {
    throw new Error('gen-rs-nodes is not implemented yet.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
    await generate();
}
