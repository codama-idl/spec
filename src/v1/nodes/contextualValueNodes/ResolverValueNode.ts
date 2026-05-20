import { array, attribute, defineNode, docs, optionalAttribute, stringIdentifier, union } from '../../../api';

export const resolverValueNode = defineNode('resolverValueNode', {
    docs: [
        'A custom resolver: a named function provided by the consumer that produces a value.',
        'May optionally depend on other accounts and arguments resolved at instruction-build time.',
    ],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the resolver function.'],
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
});
