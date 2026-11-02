---
'@codama/spec': patch
---

Declare the identifier of link nodes before their optional parent link, and the label of `valueLabelDisplayNode` before its value, so the attributes that describe a node come first. Clarify that this order is a convention for spec authors, whilst generators must emit attributes in declaration order, followed by base attributes, without regrouping them into data and child attributes.

```jsonc
// Before
{ "kind": "accountLinkNode", "program": { "kind": "programLinkNode", "identifier": "token" }, "identifier": "mint" }

// After
{ "kind": "accountLinkNode", "identifier": "mint", "program": { "kind": "programLinkNode", "identifier": "token" } }
```
