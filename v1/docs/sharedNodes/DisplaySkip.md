# DisplaySkip

Whether a member should be hidden from the fallback display list.
The interpolated sentence on `instructionDisplayNode` is governed separately — a member may be referenced there regardless of its skip value.

## Variants

- `always` - The member is never shown in the fallback list. Use for purely structural fields like discriminators.
- `never` - The member is always shown in the fallback list. This is the default.
- `whenInjected` - The member is shown only when its value was not already surfaced elsewhere through the provide/inject graph.
