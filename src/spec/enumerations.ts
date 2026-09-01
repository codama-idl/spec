/**
 * Named enumerations for the Codama spec.
 *
 * Anywhere a node attribute would otherwise be an inline string-literal union
 * (e.g. `endian: 'be' | 'le'`), the union is lifted to a named enumeration
 * here. This keeps the meta-model language-agnostic — every multi-value
 * string union has a name that codegen targets can render as a real enum.
 */

import { defineEnumeration, variant } from '../api';

export const endianness = defineEnumeration('endianness', {
    docs: ['The byte order of a numeric serialization.'],
    variants: [
        variant('be', { docs: ['Big-endian: the most significant byte is written first.'] }),
        variant('le', { docs: ['Little-endian: the least significant byte is written first.'] }),
    ],
});

export const numberFormat = defineEnumeration('numberFormat', {
    docs: ['The wire format of a numeric serialization.'],
    variants: [
        variant('f32', { docs: ['IEEE-754 32-bit floating point.'] }),
        variant('f64', { docs: ['IEEE-754 64-bit floating point.'] }),
        variant('i8', { docs: ['Signed 8-bit integer.'] }),
        variant('i16', { docs: ['Signed 16-bit integer.'] }),
        variant('i32', { docs: ['Signed 32-bit integer.'] }),
        variant('i64', { docs: ['Signed 64-bit integer.'] }),
        variant('i128', { docs: ['Signed 128-bit integer.'] }),
        variant('shortU16', {
            docs: [
                'Solana compact-u16 encoding: a variable-length unsigned integer occupying 1 to 3 bytes. Values up to `0x7f` are stored as-is in a single byte; above that, the top bit of each byte is set and the remaining value continues in the next byte, with the third byte — when needed — using all 8 bits.',
            ],
        }),
        variant('u8', { docs: ['Unsigned 8-bit integer.'] }),
        variant('u16', { docs: ['Unsigned 16-bit integer.'] }),
        variant('u32', { docs: ['Unsigned 32-bit integer.'] }),
        variant('u64', { docs: ['Unsigned 64-bit integer.'] }),
        variant('u128', { docs: ['Unsigned 128-bit integer.'] }),
    ],
});

export const bytesEncoding = defineEnumeration('bytesEncoding', {
    docs: ['How a string of bytes is encoded for transport.'],
    variants: [
        variant('base16', { docs: ['Hexadecimal encoding (two characters per byte).'] }),
        variant('base58', { docs: ['Base58 encoding, the standard for Solana addresses.'] }),
        variant('base64', { docs: ['Base64 encoding (RFC 4648).'] }),
        variant('utf8', { docs: ['UTF-8 text encoding.'] }),
    ],
});

export const instructionLifecycle = defineEnumeration('instructionLifecycle', {
    docs: ['The lifecycle stage of an instruction.'],
    variants: [
        variant('archived', {
            docs: ['No longer included in client SDKs. Retained in the IDL for historical reference only.'],
        }),
        variant('deprecated', {
            docs: ['Still callable but discouraged. Clients should migrate to a replacement instruction.'],
        }),
        variant('draft', {
            docs: ['Work-in-progress. The instruction may change before it stabilises.'],
        }),
        variant('live', { docs: ['Stable and supported for production use.'] }),
    ],
});

export const displaySkip = defineEnumeration('displaySkip', {
    docs: [
        'Whether a member should be hidden from the fallback display list.',
        'The interpolated sentence on `instructionDisplayNode` is governed separately — a member may be referenced there regardless of its skip value.',
    ],
    variants: [
        variant('always', {
            docs: [
                'The member is never shown in the fallback list. Use for purely structural fields like discriminators.',
            ],
        }),
        variant('never', {
            docs: ['The member is always shown in the fallback list. This is the default.'],
        }),
        variant('whenInjected', {
            docs: [
                'The member is shown only when its value was not already surfaced elsewhere through the provide/inject graph.',
                'When the value was pulled via injection, the member is hidden as redundant; when nothing surfaced it, the member appears under its label as a backup.',
            ],
        }),
    ],
});

export const defaultValueStrategy = defineEnumeration('defaultValueStrategy', {
    docs: ['How an attribute that carries a default value is exposed in generated APIs.'],
    variants: [
        variant('omitted', {
            docs: [
                'The attribute is not exposed as a parameter in the generated API; the default value is always used.',
            ],
        }),
        variant('optional', {
            docs: ['The attribute is exposed as an optional parameter; callers may override the default value.'],
        }),
    ],
});

export const optionalAccountStrategy = defineEnumeration('optionalAccountStrategy', {
    docs: ['How an absent optional account is represented when serialising an instruction.'],
    variants: [
        variant('omitted', {
            docs: ['The account slot is left out of the instruction entirely. Subsequent accounts shift up.'],
        }),
        variant('programId', {
            docs: ['The account slot is filled with the program ID as a placeholder, preserving positional indices.'],
        }),
    ],
});

export const preOffsetStrategy = defineEnumeration('preOffsetStrategy', {
    docs: [
        'How a pre-offset transform interprets its offset value before serialising the transformed type.',
        'See `preOffsetTransformNode` for an illustrated walkthrough of each strategy.',
    ],
    variants: [
        variant('absolute', {
            docs: [
                'Move the cursor to the absolute byte position given by the offset; a negative offset counts backwards from the end of the buffer.',
            ],
        }),
        variant('padded', {
            docs: [
                'Move the cursor like `relative` while growing the buffer by the offset amount; a negative offset moves the cursor backwards and shrinks the buffer.',
            ],
        }),
        variant('relative', {
            docs: [
                'Advance the cursor by the offset bytes relative to its current position; a negative offset moves it backwards.',
            ],
        }),
    ],
});

export const postOffsetStrategy = defineEnumeration('postOffsetStrategy', {
    docs: [
        'How a post-offset transform interprets its offset value after serialising the transformed type.',
        'See `postOffsetTransformNode` for an illustrated walkthrough of each strategy.',
    ],
    variants: [
        variant('absolute', {
            docs: [
                'Move the cursor to the absolute byte position given by the offset; a negative offset counts backwards from the end of the buffer.',
            ],
        }),
        variant('padded', {
            docs: [
                'Move the cursor like `relative` while growing the buffer by the offset amount; a negative offset moves the cursor backwards and shrinks the buffer.',
            ],
        }),
        variant('preOffset', {
            docs: [
                'Move the cursor by the offset bytes relative to the pre-offset — where the transformed type started — rather than where it ended; a negative offset moves it to the left of that position.',
            ],
        }),
        variant('relative', {
            docs: [
                'Advance the cursor by the offset bytes relative to its current position; a negative offset moves it backwards.',
            ],
        }),
    ],
});

export const ALL_ENUMERATIONS = [
    bytesEncoding,
    defaultValueStrategy,
    displaySkip,
    endianness,
    instructionLifecycle,
    numberFormat,
    optionalAccountStrategy,
    postOffsetStrategy,
    preOffsetStrategy,
] as const;
