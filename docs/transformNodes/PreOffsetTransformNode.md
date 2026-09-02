# PreOffsetTransformNode

Before serialising the transformed type, advance the cursor by `offset` bytes interpreted via the chosen strategy.

Since the offset is applied _before_ the transformed type runs, this transform is useful to move the encoded value of the transformed type itself. See `postOffsetTransformNode` for the opposite behaviour.

The strategies below are illustrated against the following buffer: the `99` byte represents some previously encoded value for reference and the `FF` byte represents the encoded value of the transformed type, which moves as its pre-offset changes.

```
0x00000099FF000000;
          └-- Initial pre-offset
```

**`relative`** — the cursor is moved to the right by the provided offset. A negative offset moves it to the left instead.

```
offset = 2
0x000000990000FF00;
              └-- Pre-offset

offset = -2
0x0000FF9900000000;
      └-- Pre-offset
```

**`absolute`** — the cursor is moved to an absolute position in the buffer. A negative offset moves it backwards from the end of the buffer.

```
offset = 0
0xFF00009900000000;
  └-- Pre-offset

offset = -2
0x000000990000FF00;
              └-- Pre-offset
```

**`padded`** — the cursor is moved to the right by the provided offset **and the buffer size is increased** by the offset amount, allowing padding bytes to be added. Reciprocally, a negative offset moves the cursor to the left and decreases the buffer size.

```
offset = 2
0x000000990000FF000000; <- Size = 10 (initially 8)
              └-- Pre-offset

offset = -2
0x0000FF990000; <- Size = 6 (initially 8)
      └-- Pre-offset
```

> [!IMPORTANT]
> Some transforms affect the buffer that is available to us: depending on where we are in the type tree, we may not have access to the entire buffer.
> For instance, under a `fixedSizeTransformNode`, the buffer is truncated or padded to match the provided fixed size once the transformed content has been serialised — we are essentially "boxed" into a sub-buffer, and that sub-buffer is the one affected by the `absolute` strategy.
> The transforms that create sub-buffers are: `fixedSizeTransformNode`, `sentinelTransformNode`, and `sizePrefixTransformNode`.

## Attributes

### Data

| Attribute | Type                       | Description                                                       |
| --------- | -------------------------- | ----------------------------------------------------------------- |
| `kind`    | `"preOffsetTransformNode"` | The node discriminator.                                           |
| `offset`  | `i64`                      | The signed byte offset to apply before the transformed type runs. |

### Children

| Attribute  | Type                                                       | Description                                                                                                                           |
| ---------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `strategy` | [`PreOffsetStrategy`](../sharedNodes/PreOffsetStrategy.md) | How the `offset` value is interpreted.                                                                                                |
| `plugins`  | [`PluginNode`](../PluginNode.md)[] _(optional)_            | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A relative pre-offset (the default strategy)

```typescript
integerTypeNode('u32', { transforms: [preOffsetTransformNode(2)] });
```

### An absolute pre-offset

```typescript
integerTypeNode('u32', { transforms: [preOffsetTransformNode(-2, 'absolute')] });
```

### A left-padded u32 number

```typescript
integerTypeNode('u32', { transforms: [preOffsetTransformNode(4, 'padded')] });

// 42 => 0x000000002A000000
```

### A u32 number overwritten by a u16 number

```typescript
tupleTypeNode([integerTypeNode('u32'), integerTypeNode('u16', { transforms: [preOffsetTransformNode(-2)] })]);

// [1, 2]           => 0x01000200
// [0xFFFFFFFF, 42] => 0xFFFF2A00
```
