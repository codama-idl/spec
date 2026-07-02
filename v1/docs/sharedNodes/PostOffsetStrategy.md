# `PostOffsetStrategy`

How a post-offset modifier interprets its offset value after serialising the wrapped type.

## Variants

- `absolute` - Move the cursor to the absolute byte position given by the offset.
- `padded` - Pad with zero bytes from the current cursor up to the offset bytes ahead.
- `preOffset` - Restore the cursor to where it was before the wrapped type ran (cancelling its pre-offset).
- `relative` - Advance the cursor by the offset bytes relative to its current position.
