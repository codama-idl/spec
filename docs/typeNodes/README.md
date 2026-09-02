# Type

Type nodes — the building blocks of every value shape.

## Nodes

- [`ArrayTypeNode`](./ArrayTypeNode.md) - A homogeneous list of items. The item type is defined by `item`; the length is determined by the `count` strategy.
- [`BooleanTypeNode`](./BooleanTypeNode.md) - A boolean serialised as an integer. The inner integer type determines the byte width.
- [`BytesTypeNode`](./BytesTypeNode.md) - A raw sequence of bytes. Typically carries a fixed-size, size-prefix, or sentinel transform to bound its extent.
- [`DateTimeTypeNode`](./DateTimeTypeNode.md) - A point in time encoded as an integer count of ticks since the Unix epoch.
- [`DurationTypeNode`](./DurationTypeNode.md) - An elapsed duration encoded as an integer count of ticks.
- [`EnumTypeNode`](./EnumTypeNode.md) - A tagged union: a numeric discriminator followed by one of several variant payloads.
- [`EnumVariantTypeNode`](./EnumVariantTypeNode.md) - A named variant of an enum, with an optional data payload.
- [`FixedPointTypeNode`](./FixedPointTypeNode.md) - A scaled quantity stored as an integer: the value is `raw / base^scale`.
- [`FloatTypeNode`](./FloatTypeNode.md) - An IEEE-754 floating-point number with a fixed wire format and byte order.
- [`IntegerTypeNode`](./IntegerTypeNode.md) - An integer with a fixed wire format and byte order.
- [`MapTypeNode`](./MapTypeNode.md) - A keyed map.
- [`OptionTypeNode`](./OptionTypeNode.md) - A value that may be present or absent (Some/None), with an explicit numeric prefix indicating presence.
- [`PublicKeyTypeNode`](./PublicKeyTypeNode.md) - A 32-byte Solana public key.
- [`RemainderOptionTypeNode`](./RemainderOptionTypeNode.md) - A value that may be present or absent. Presence is signalled by whether any bytes remain to be read, with no explicit prefix.
- [`SetTypeNode`](./SetTypeNode.md) - A unique-valued collection. The item type is defined by `item`; the size is determined by the `count` strategy.
- [`StringTypeNode`](./StringTypeNode.md) - A string value.
- [`StructFieldTypeNode`](./StructFieldTypeNode.md) - A named field within a struct type.
- [`StructTypeNode`](./StructTypeNode.md) - A composite type made of an ordered list of named fields. Fields are encoded and decoded in declaration order.
- [`TupleTypeNode`](./TupleTypeNode.md) - A heterogeneous fixed-length sequence in which each positional slot has its own type.
- [`ZeroableOptionTypeNode`](./ZeroableOptionTypeNode.md) - An optional value whose absence is signalled by a designated zero value rather than a presence flag.

## Unions

- [`RegisteredTypeNode`](./RegisteredTypeNode.md) - Every node tagged as a type-shaped node, including variants and struct fields.
- [`StandaloneTypeNode`](./StandaloneTypeNode.md) - Every type node that can be used as a top-level type.
- [`TypeNode`](./TypeNode.md) - The composable form: any standalone type, or a reference to a defined type via `definedTypeLinkNode`.
