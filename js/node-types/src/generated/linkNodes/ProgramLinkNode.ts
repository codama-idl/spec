import type { CamelCaseString } from '../shared/brands';

/** A reference to a program by name. */
export interface ProgramLinkNode {
    readonly kind: 'programLinkNode';

    // Data.
    /** The name of the referenced program. */
    readonly name: CamelCaseString;
}
