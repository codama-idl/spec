---
'@codama/spec': minor
---

Cross account links with an explicit `.data` segment. A path reaching a public key whose type carries an `accountLink` now continues into the linked account's data through `.data`, as it does after an account identifier in interpolated intents, and `mint.data` reads the account's whole data, even when it is not a struct. Other segments after such a public key are reserved for future attributes of the account, such as its lamports, and are invalid until then.

This replaces the implicit crossing introduced in `2.0.0-rc.2`: `mint.decimals` is no longer valid and must become `mint.data.decimals`.

| Before                                | After                                      |
| ------------------------------------- | ------------------------------------------ |
| `mint.decimals`                       | `mint.data.decimals`                       |
| `${data.mint.decimals}`               | `${data.mint.data.decimals}`               |
| `${accounts.source.data.mint.symbol}` | `${accounts.source.data.mint.data.symbol}` |
