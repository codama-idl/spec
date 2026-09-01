# DefinedTypeLinkNode

A reference to a defined type — possibly in a different program.

## Attributes

### Data

| Attribute    | Type                    | Description                                    |
| ------------ | ----------------------- | ---------------------------------------------- |
| `kind`       | `"definedTypeLinkNode"` | The node discriminator.                        |
| `identifier` | `IdentifierString`      | The identifier of the referenced defined type. |

### Children

| Attribute    | Type                                                                 | Description                                                                                                                           |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `program`    | [`ProgramLinkNode`](./ProgramLinkNode.md) _(optional)_               | The program the referenced type is defined in. When omitted, the surrounding program is assumed.                                      |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a defined type link node from a type name

```typescript
const node = definedTypeLinkNode('myDefinedType');
const nodeFromAnotherProgram = definedTypeLinkNode('myDefinedType', 'myOtherProgram');
```
