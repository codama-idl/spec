# Type

Type nodes — the building blocks of every value shape.

## Nodes

- [`AmountTypeNode`](./AmountTypeNode.md) - Wraps a number type to provide additional context such as decimal places and a unit.
- [`ArrayTypeNode`](./ArrayTypeNode.md) - A homogeneous list of items. The item type is defined by `item`; the length is determined by the `count` strategy.
- [`BooleanTypeNode`](./BooleanTypeNode.md) - A boolean serialised as a numeric value. The inner number type determines the byte width.
- [`BytesTypeNode`](./BytesTypeNode.md) - A raw sequence of bytes. Typically carries a fixed-size, size-prefix, or sentinel transform to bound its extent.
- [`DateTimeTypeNode`](./DateTimeTypeNode.md) - A timestamp encoded as a number, typically seconds since the Unix epoch. The inner number type determines the byte width.
- [`EnumEmptyVariantTypeNode`](./EnumEmptyVariantTypeNode.md) - A unit-style variant of an enum that carries no payload.
- [`EnumStructVariantTypeNode`](./EnumStructVariantTypeNode.md) - A variant of an enum that carries a struct payload (named fields).
- [`EnumTupleVariantTypeNode`](./EnumTupleVariantTypeNode.md) - A variant of an enum that carries a tuple payload (positional fields).
- [`EnumTypeNode`](./EnumTypeNode.md) - A tagged union: a numeric discriminator followed by one of several variant payloads.
- [`MapTypeNode`](./MapTypeNode.md) - A keyed map.
- [`NumberTypeNode`](./NumberTypeNode.md) - A numeric type with a fixed wire format and byte order.
- [`OptionTypeNode`](./OptionTypeNode.md) - A value that may be present or absent (Some/None), with an explicit numeric prefix indicating presence.
- [`PublicKeyTypeNode`](./PublicKeyTypeNode.md) - A 32-byte Solana public key.
- [`RemainderOptionTypeNode`](./RemainderOptionTypeNode.md) - A value that may be present or absent. Presence is signalled by whether any bytes remain to be read, with no explicit prefix.
- [`SetTypeNode`](./SetTypeNode.md) - A unique-valued collection. The item type is defined by `item`; the size is determined by the `count` strategy.
- [`SolAmountTypeNode`](./SolAmountTypeNode.md) - A SOL amount expressed in lamports under the inner numeric type.
- [`StringTypeNode`](./StringTypeNode.md) - A string value.
- [`StructFieldTypeNode`](./StructFieldTypeNode.md) - A named field within a struct type.
- [`StructTypeNode`](./StructTypeNode.md) - A composite type made of an ordered list of named fields. Fields are encoded and decoded in declaration order.
- [`TupleTypeNode`](./TupleTypeNode.md) - A heterogeneous fixed-length sequence in which each positional slot has its own type.
- [`ZeroableOptionTypeNode`](./ZeroableOptionTypeNode.md) - An optional value whose absence is signalled by a designated zero value rather than a presence flag.

## Unions

- [`EnumVariantTypeNode`](./EnumVariantTypeNode.md) - The variant flavours of an `enumTypeNode`.
- [`RegisteredTypeNode`](./RegisteredTypeNode.md) - Every node tagged as a type-shaped node, including variants and struct fields.
- [`StandaloneTypeNode`](./StandaloneTypeNode.md) - Every type node that can be used as a top-level type.
- [`TypeNode`](./TypeNode.md) - The composable form: any standalone type, or a reference to a defined type via `definedTypeLinkNode`.
