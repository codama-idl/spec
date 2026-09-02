# IntegerFormat

The wire format of an integer serialization.

## Variants

- `i8` - Signed 8-bit integer.
- `i16` - Signed 16-bit integer.
- `i32` - Signed 32-bit integer.
- `i64` - Signed 64-bit integer.
- `i128` - Signed 128-bit integer.
- `shortU16` - Solana compact-u16 encoding: a variable-length unsigned integer occupying 1 to 3 bytes. Values up to `0x7f` are stored as-is in a single byte; above that, the top bit of each byte is set and the remaining value continues in the next byte, with the third byte — when needed — using all 8 bits.
- `u8` - Unsigned 8-bit integer.
- `u16` - Unsigned 16-bit integer.
- `u32` - Unsigned 32-bit integer.
- `u64` - Unsigned 64-bit integer.
- `u128` - Unsigned 128-bit integer.
