import { array, attribute, defineNode, docs, optionalAttribute, stringIdentifier, union } from '../../../api';
import { examples } from './ResolverValueNode.examples';

export const resolverValueNode = defineNode('resolverValueNode', {
    docs: [
        'A custom resolver: a named function provided by the consumer that produces a value.',
        'May optionally depend on other accounts and arguments resolved at instruction-build time.',
        'This node acts as a fallback for any value or logic that cannot easily be described by the other nodes — renderers treat resolvers as functions that can be injected into the generated code.',
    ],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: [
                'A unique identifier for the resolver.',
                'This is typically the name of the function that renderers will invoke.',
            ],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the resolver.'],
        }),
        optionalAttribute('dependsOn', array(union('resolverDependency')), {
            docs: [
                'The accounts and arguments the resolver depends on. Used by clients to ensure the dependencies are resolved first.',
            ],
        }),
    ],
    examples,
});
