# DefinedTypeLinkNode

A reference to a defined type — possibly in a different program.

## Attributes

### Data

| Attribute | Type                    | Description                              |
| --------- | ----------------------- | ---------------------------------------- |
| `kind`    | `"definedTypeLinkNode"` | The node discriminator.                  |
| `name`    | `CamelCaseString`       | The name of the referenced defined type. |

### Children

| Attribute | Type                                                   | Description                                                                                      |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `program` | [`ProgramLinkNode`](./ProgramLinkNode.md) _(optional)_ | The program the referenced type is defined in. When omitted, the surrounding program is assumed. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a defined type link node from a type name

```typescript
const node = definedTypeLinkNode('myDefinedType');
const nodeFromAnotherProgram = definedTypeLinkNode('myDefinedType', 'myOtherProgram');
```
