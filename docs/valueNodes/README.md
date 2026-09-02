# Value

Value nodes — concrete values whose shape is described by a type node.

## Nodes

- [`ArrayValueNode`](./ArrayValueNode.md) - A concrete array value: a list of value nodes.
- [`BooleanValueNode`](./BooleanValueNode.md) - A concrete boolean value.
- [`BytesValueNode`](./BytesValueNode.md) - A concrete bytes value, encoded as text in the chosen encoding.
- [`ConstantValueNode`](./ConstantValueNode.md) - A typed constant: a type node paired with a concrete value node.
- [`EnumValueNode`](./EnumValueNode.md) - A concrete value of a defined enum: a variant identifier plus an optional payload.
- [`FloatValueNode`](./FloatValueNode.md) - A concrete floating-point value, stored as a string so round-trips are deterministic across serialisers.
- [`InjectedValueNode`](./InjectedValueNode.md) - A value resolved by key from a surrounding provider.
- [`IntegerValueNode`](./IntegerValueNode.md) - A concrete integer value, stored as a string so the full 64- and 128-bit ranges survive JSON transport losslessly.
- [`MapEntryValueNode`](./MapEntryValueNode.md) - A single (key, value) pair inside a `mapValueNode`.
- [`MapValueNode`](./MapValueNode.md) - A concrete map value: a list of (key, value) entries.
- [`NoneValueNode`](./NoneValueNode.md) - The "absent" value for an optional type.
- [`PublicKeyValueNode`](./PublicKeyValueNode.md) - A concrete 32-byte public key, with an optional symbolic identifier for the address.
- [`SetValueNode`](./SetValueNode.md) - A concrete set value: a list of unique value nodes.
- [`SomeValueNode`](./SomeValueNode.md) - The "present" value for an optional type, wrapping a concrete value node.
- [`StringValueNode`](./StringValueNode.md) - A concrete string value.
- [`StructFieldValueNode`](./StructFieldValueNode.md) - A named field of a `structValueNode`.
- [`StructValueNode`](./StructValueNode.md) - A concrete struct value: a list of named field values.
- [`TupleValueNode`](./TupleValueNode.md) - A concrete tuple value: a fixed-length sequence of positional value nodes.

## Unions

- [`EnumValuePayload`](./EnumValuePayload.md) - The payload kinds an `enumValueNode` may carry — struct fields or positional tuple slots.
- [`InjectableIntegerValueNode`](./InjectableIntegerValueNode.md) - A concrete integer value, or a key resolved at presentation time from a surrounding provider.
- [`InjectableStringValueNode`](./InjectableStringValueNode.md) - A concrete string value, or a key resolved at presentation time from a surrounding provider.
- [`RegisteredValueNode`](./RegisteredValueNode.md) - Every node tagged as a value-shaped node, including container variants.
- [`StandaloneValueNode`](./StandaloneValueNode.md) - Every value node that can be used as a top-level value.
- [`ValueNode`](./ValueNode.md) - The composable form: any standalone value node.
