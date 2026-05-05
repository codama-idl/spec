import type { CamelCaseString } from '../shared/brands';
import type { ResolverDependency } from './ResolverDependency';

/** A custom resolver: a named function provided by the consumer that produces a value, optionally depending on other accounts and arguments. */
export interface ResolverValueNode<
    TDependsOn extends ResolverDependency[] | undefined = ResolverDependency[] | undefined,
> {
    readonly kind: 'resolverValueNode';

    // Data.
    /** The name of the resolver function. */
    readonly name: CamelCaseString;
    /** Markdown documentation for the resolver. */
    readonly docs?: string[];

    // Children.
    /** The accounts and arguments the resolver depends on. Used by clients to ensure the dependencies are resolved first. */
    readonly dependsOn?: TDependsOn;
}
