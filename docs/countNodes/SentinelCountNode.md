# SentinelCountNode

A count strategy where items are read until the bytes at the next item position match a constant sentinel.
Unlike `sentinelTransformNode`, the sentinel is only compared at item boundaries and never searched for within the encoded bytes, so it may legitimately occur inside an item.

At each item boundary, decoding proceeds in order:

1. If fewer bytes than the sentinel remain, decoding fails under the `required` strategy and stops otherwise.
2. If the next bytes match the sentinel, they are consumed and decoding stops.
3. Otherwise, one item is decoded and the process repeats.

The `strategy` attribute controls whether the sentinel is written when encoding and required when decoding. `required` writes it and demands it. `optional` writes it but tolerates buffers that end without it, such as tightly sized or legacy data. `omitted` never writes it and is therefore only meaningful when the collection is followed by unused space or the end of the buffer, since nothing else marks where it ends.

In every strategy, a sentinel that is present is consumed. Should a following attribute need to read those bytes as well, wrap it in a `preOffsetTransformNode` that steps back by the size of the sentinel.

> [!IMPORTANT]
> No item may begin with the sentinel's bytes, or decoding would stop at that item. With the `optional` and `omitted` strategies, the sentinel must also be no wider than the smallest possible item, so that a tail shorter than the sentinel can never hold a valid item.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"sentinelCountNode"` | The node discriminator. |

### Children

| Attribute  | Type                                                                            | Description                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `strategy` | [`SentinelCountStrategy`](../sharedNodes/SentinelCountStrategy.md) _(optional)_ | Whether the sentinel is written when encoding and required when decoding. When absent, `required` is assumed.                         |
| `sentinel` | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md)                       | The fixed-size constant compared against the bytes at each item position.                                                             |
| `plugins`  | [`PluginNode`](../PluginNode.md)[] _(optional)_                                 | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a sentinel count node

```typescript
const node = sentinelCountNode(constantValueNode(integerTypeNode('u8'), integerValueNode('0')));
```

### A list of public keys terminated by the default public key

The sentinel is as wide as an item, so the only key that can never appear in the list is the all-zero key itself, which programs conventionally use as a null marker. This is also the System Program ID, so the pattern does not suit a list that could legitimately contain it.
A narrower sentinel, such as a single `0xFF` byte, would be ambiguous: about one key in 256 starts with that byte.
The sentinel is required by default, so decoding `A B` without the trailing zero key fails.

```typescript
arrayTypeNode(
    publicKeyTypeNode(),
    sentinelCountNode(constantValueNode(publicKeyTypeNode(), publicKeyValueNode('11111111111111111111111111111111'))),
);

// [A, B] => A B 00…00 (32 zero bytes)
```

### TLV extensions terminated by an uninitialised type, followed by unused space

Each extension starts with a `u16` type, and a type of `0` marks the end of the initialised region. Anything after it is unused space of any length that the program never writes a terminator for, which is why the sentinel is `omitted`.

```typescript
arrayTypeNode(
    definedTypeLinkNode('extension'),
    sentinelCountNode(constantValueNode(integerTypeNode('u16'), integerValueNode('0')), 'omitted'),
);

// 0700 0000 | 0200 0800 0000000000000000 | 0000 | 0000000000
// ImmutableOwner | TransferFeeAmount     | stop | ignored
```

```jsonc
{
    "kind": "arrayTypeNode",
    "item": { "kind": "definedTypeLinkNode", "identifier": "extension" },
    "count": {
        "kind": "sentinelCountNode",
        "strategy": "omitted",
        "sentinel": {
            "kind": "constantValueNode",
            "type": { "kind": "integerTypeNode", "format": "u16" },
            "value": { "kind": "integerValueNode", "value": "0" }
        }
    }
}
```

### Discriminated seeds inside a zero-padded fixed-size slot

Seeds start with a `u8` discriminator and `0` marks the end of the list. The slot is zero-padded to 32 bytes, so a full slot has no room for a terminator: the sentinel is omitted when encoding and tolerated when decoding.

```typescript
arrayTypeNode(
    definedTypeLinkNode('seed'),
    sentinelCountNode(constantValueNode(integerTypeNode('u8'), integerValueNode('0')), 'omitted'),
    { transforms: [fixedSizeTransformNode(32)] },
);
```
