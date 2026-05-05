/**
 * Named enumerations for the Codama v1 spec.
 *
 * Anywhere a node attribute would otherwise be an inline string-literal union
 * (e.g. `endian: 'be' | 'le'`), the union is lifted to a named enumeration
 * here. This keeps the meta-model language-agnostic — every multi-value
 * string union has a name that codegen targets can render as a real enum.
 */

import { defineEnumeration, variant } from '../api';

export const endianness = defineEnumeration('Endianness', {
    docs: 'The byte order of a numeric serialization.',
    variants: [
        variant('be', { docs: 'Big-endian: the most significant byte is written first.' }),
        variant('le', { docs: 'Little-endian: the least significant byte is written first.' }),
    ],
});

export const numberFormat = defineEnumeration('NumberFormat', {
    docs: 'The wire format of a numeric serialization.',
    variants: [
        variant('f32', { docs: 'IEEE-754 32-bit floating point.' }),
        variant('f64', { docs: 'IEEE-754 64-bit floating point.' }),
        variant('i8', { docs: 'Signed 8-bit integer.' }),
        variant('i16', { docs: 'Signed 16-bit integer.' }),
        variant('i32', { docs: 'Signed 32-bit integer.' }),
        variant('i64', { docs: 'Signed 64-bit integer.' }),
        variant('i128', { docs: 'Signed 128-bit integer.' }),
        variant('shortU16', {
            docs: 'Solana compact-u16 encoding: a variable-length unsigned integer occupying 1 to 3 bytes.',
        }),
        variant('u8', { docs: 'Unsigned 8-bit integer.' }),
        variant('u16', { docs: 'Unsigned 16-bit integer.' }),
        variant('u32', { docs: 'Unsigned 32-bit integer.' }),
        variant('u64', { docs: 'Unsigned 64-bit integer.' }),
        variant('u128', { docs: 'Unsigned 128-bit integer.' }),
    ],
});

export const bytesEncoding = defineEnumeration('BytesEncoding', {
    docs: 'How a string of bytes is encoded for transport.',
    variants: [
        variant('base16', { docs: 'Hexadecimal encoding (two characters per byte).' }),
        variant('base58', { docs: 'Base58 encoding, the standard for Solana addresses.' }),
        variant('base64', { docs: 'Base64 encoding (RFC 4648).' }),
        variant('utf8', { docs: 'UTF-8 text encoding.' }),
    ],
});

export const instructionLifecycle = defineEnumeration('InstructionLifecycle', {
    docs: 'The lifecycle stage of an instruction.',
    variants: [
        variant('archived', {
            docs: 'No longer included in client SDKs. Retained in the IDL for historical reference only.',
        }),
        variant('deprecated', {
            docs: 'Still callable but discouraged. Clients should migrate to a replacement instruction.',
        }),
        variant('draft', {
            docs: 'Work-in-progress. The instruction may change before it stabilises.',
        }),
        variant('live', { docs: 'Stable and supported for production use.' }),
    ],
});

export const defaultValueStrategy = defineEnumeration('DefaultValueStrategy', {
    docs: 'How an attribute that carries a default value is exposed in generated APIs.',
    variants: [
        variant('omitted', {
            docs: 'The attribute is not exposed as a parameter in the generated API; the default value is always used.',
        }),
        variant('optional', {
            docs: 'The attribute is exposed as an optional parameter; callers may override the default value.',
        }),
    ],
});

export const optionalAccountStrategy = defineEnumeration('OptionalAccountStrategy', {
    docs: 'How an absent optional account is represented when serialising an instruction.',
    variants: [
        variant('omitted', {
            docs: 'The account slot is left out of the instruction entirely. Subsequent accounts shift up.',
        }),
        variant('programId', {
            docs: 'The account slot is filled with the program ID as a placeholder, preserving positional indices.',
        }),
    ],
});

export const preOffsetStrategy = defineEnumeration('PreOffsetStrategy', {
    docs: 'How a pre-offset modifier interprets its offset value before serialising the wrapped type.',
    variants: [
        variant('absolute', {
            docs: 'Move the cursor to the absolute byte position given by the offset.',
        }),
        variant('padded', {
            docs: 'Pad with zero bytes from the current cursor up to the offset bytes ahead.',
        }),
        variant('relative', {
            docs: 'Advance the cursor by the offset bytes relative to its current position.',
        }),
    ],
});

export const postOffsetStrategy = defineEnumeration('PostOffsetStrategy', {
    docs: 'How a post-offset modifier interprets its offset value after serialising the wrapped type.',
    variants: [
        variant('absolute', {
            docs: 'Move the cursor to the absolute byte position given by the offset.',
        }),
        variant('padded', {
            docs: 'Pad with zero bytes from the current cursor up to the offset bytes ahead.',
        }),
        variant('preOffset', {
            docs: 'Restore the cursor to where it was before the wrapped type ran (cancelling its pre-offset).',
        }),
        variant('relative', {
            docs: 'Advance the cursor by the offset bytes relative to its current position.',
        }),
    ],
});

export const programOrigin = defineEnumeration('ProgramOrigin', {
    docs: 'The toolchain that originally generated a program description.',
    variants: [
        variant('anchor', { docs: 'The program was originally described by an Anchor IDL.' }),
        variant('shank', { docs: 'The program was originally described by a Shank IDL.' }),
    ],
});

export const ALL_ENUMERATIONS = [
    bytesEncoding,
    defaultValueStrategy,
    endianness,
    instructionLifecycle,
    numberFormat,
    optionalAccountStrategy,
    postOffsetStrategy,
    preOffsetStrategy,
    programOrigin,
] as const;
