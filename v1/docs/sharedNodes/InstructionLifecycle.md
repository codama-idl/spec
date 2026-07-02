# `InstructionLifecycle`

The lifecycle stage of an instruction.

## Variants

- `archived` - No longer included in client SDKs. Retained in the IDL for historical reference only.
- `deprecated` - Still callable but discouraged. Clients should migrate to a replacement instruction.
- `draft` - Work-in-progress. The instruction may change before it stabilises.
- `live` - Stable and supported for production use.
