---
'@codama/spec': minor
---

Relax identifier uniqueness: identifiers sharing a scope must no longer be unique after lowercasing and stripping underscores, but must not have the same camelCase form. Words are split at underscores, at lowercase-to-uppercase boundaries and before the last capital of an acronym run, so `foo_dart` and `food_art` or `group__sub_group__name` and `group_subgroup_name` may now coexist, whilst `fooBar` and `foo_bar`, `getURL` and `get_url`, or `_foo` and `foo` still may not. Every IDL valid under the previous rule remains valid. Renderers must derive every casing from these words, keep a word separator wherever letter case is not significant (e.g. file names), and disambiguate identifiers of different scopes emitted into a shared namespace.
