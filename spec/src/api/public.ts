/**
 * Public-facing types and helpers re-exported by every spec major version.
 *
 * Each version's `index.ts` does `export * from '../api/public'` so the
 * version-agnostic surface stays in lockstep without per-version
 * maintenance. Authoring helpers (`defineNode`, primitives, …) are NOT
 * included here — they live in `./index.ts` for internal use only.
 */

export type {
    AttributeSpec,
    CategorySpec,
    EnumerationSpec,
    EnumerationVariantSpec,
    FloatWidth,
    IntegerWidth,
    LiteralValue,
    NestedUnionSpec,
    NodeSpec,
    Spec,
    StringConstraint,
    TypeExpr,
    UnionMember,
    UnionSpec,
} from './types';

export { isChildAttribute } from './validate';
