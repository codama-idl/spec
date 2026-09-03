---
'@codama/spec': major
---

Remove the `origin` attribute from `programNode` and the `programOrigin` enumeration. The attribute recorded which toolchain generated the description from a closed whitelist (`anchor`/`shank`) that cannot keep up with an open ecosystem, described provenance rather than the program itself, and went stale as IDLs were edited after generation.

**BREAKING CHANGES**

**`programNode.origin` and the `programOrigin` enumeration are removed.** Tools that need provenance metadata can attach it via the universal `plugins` list instead.

```diff
  programNode({
      name: 'myProgram',
-     origin: 'anchor',
+     plugins: [pluginNode('anchor')],
      // ...
  });
```
