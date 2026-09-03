# PdaNode

A program-derived address: its identifier, optional program ID override, and the seeds used to derive it.

![Diagram](https://github.com/codama-idl/codama/assets/3642397/4f7c9718-1ffa-4f2c-aa45-71b3ce204219)

## Attributes

### Data

| Attribute    | Type                   | Description                                                                                             |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `kind`       | `"pdaNode"`            | The node discriminator.                                                                                 |
| `identifier` | `IdentifierString`     | The identifier of the PDA.                                                                              |
| `programId`  | `Address` _(optional)_ | The base58-encoded program ID used to derive the PDA. When omitted, the surrounding program is assumed. |

### Children

| Attribute | Type                                                 | Description                                                                                                                           |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `docs`    | `string` \| [`TextNode`](./TextNode.md) _(optional)_ | Markdown documentation for the PDA.                                                                                                   |
| `seeds`   | [`PdaSeedNode`](./pdaSeedNodes/PdaSeedNode.md)[]     | The seeds used to derive the PDA, in order.                                                                                           |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_       | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A PDA with constant and variable seeds

```typescript
pdaNode({
    identifier: 'ticket',
    seeds: [
        constantPdaSeedNodeFromString('utf8', 'raffles'),
        variablePdaSeedNode('raffle', publicKeyTypeNode()),
        constantPdaSeedNodeFromString('utf8', 'tickets'),
        variablePdaSeedNode('ticketNumber', integerTypeNode('u32')),
    ],
});
```

### A PDA with no seeds

```typescript
pdaNode({
    identifier: 'seedlessPda',
    seeds: [],
});
```
