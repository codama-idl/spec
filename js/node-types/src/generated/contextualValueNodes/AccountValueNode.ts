import type { CamelCaseString } from '../shared/brands';

/** Refers to a named account in the surrounding instruction. */
export interface AccountValueNode {
    readonly kind: 'accountValueNode';

    // Data.
    /** The name of the referenced account. */
    readonly name: CamelCaseString;
}
