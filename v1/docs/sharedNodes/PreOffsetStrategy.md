# PreOffsetStrategy

How a pre-offset modifier interprets its offset value before serialising the wrapped type.
See `preOffsetTypeNode` for an illustrated walkthrough of each strategy.

## Variants

- `absolute` - Move the cursor to the absolute byte position given by the offset; a negative offset counts backwards from the end of the buffer.
- `padded` - Move the cursor like `relative` while growing the buffer by the offset amount; a negative offset moves the cursor backwards and shrinks the buffer.
- `relative` - Advance the cursor by the offset bytes relative to its current position; a negative offset moves it backwards.
