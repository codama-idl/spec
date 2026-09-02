---
'@codama/spec': major
---

Replace instruction arguments with a single `data` type node. Instructions now describe their serialised data exactly like accounts and events do — with one optional type node — and contextual defaults flow through the inject/provide pattern instead of argument-specific machinery. Renderer-specific resolution moves out of the standard and into namespaced plugins, so IDLs become statically checkable: every injection key must resolve in scope or carry a fallback.

**BREAKING CHANGES**

**`instructionNode.arguments` becomes `data?: TypeNode`; `instructionArgumentNode` is removed.** Arguments map to struct fields one-to-one; an absent `data` means the instruction serialises no data. Contextual defaults become provide/inject pairs: the field carries an `injectedValueNode` and the instruction's `provides` supplies the contextual value. Resolution is lexical (nearest enclosing `provides` wins) and self-contained (every key resolves in scope or has a `fallback`).

```diff
  instructionNode({
      identifier: 'createAccount',
-     arguments: [
-         instructionArgumentNode({
+     data: structTypeNode([
+         structFieldTypeNode({
              identifier: 'bump',
              type: numberTypeNode('u8'),
-             defaultValue: accountBumpValueNode('newAccount'),
+             defaultValue: injectedValueNode({ key: 'bump' }),
          }),
-     ],
+     ]),
+     provides: [providedNode('bump', accountBumpValueNode('newAccount'))],
  });
```

**`extraArguments` and `resolverValueNode` are removed.** Both were information gaps: the IDL claimed an input existed but could not say how to produce it. Renderer-specific resolution now rides on plugins attached to the node that owns the concern — refining a declared shape when one exists, or marking an honest absence when none does (an account default that only custom code can compute is simply an account with no `defaultValue` and a plugin).

```diff
  instructionRemainingAccountsNode('authorities', {
      isSigner: true,
+     plugins: [
+         pluginNode('codama.jsResolver', {
+             payload: { function: 'resolveAuthorities', dependsOn: ['data.multisig'] },
+         }),
+     ],
  });
```

**`instructionRemainingAccountsNode` declares a named client input.** Its `value` union (`argumentValueNode | resolverValueNode`) is replaced by an `identifier` naming the account-list input exposed to callers — the same declaration model as `instructionAccountNode`; the `instructionRemainingAccountsValue` union is removed.

**`instructionByteDeltaValue` and `conditionalValueCondition` lose their resolver members**, becoming `accountLinkNode | argumentValueNode | numberValueNode` and `accountValueNode | argumentValueNode` respectively; the `resolverDependency` union is removed with the node.

**`instructionArgumentLinkNode` is removed.** Link nodes point at nodes on the tree; with arguments now values inside a type node, reaching them is the job of path expressions, not links.
