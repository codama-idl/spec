import { attribute, defineNode, optionalAttribute, stringIdentifier, union } from '../../../api';

export const injectedValueNode = defineNode('injectedValueNode', {
    docs: [
        'A value resolved by key from a surrounding provider.',
        'A `providedNode` higher in the resolution tree supplies the actual value; the consumer references only the `key`, so the same type stays portable across instructions that wire the key differently.',
        'Resolution is a per-context property: a value with the same key may resolve in one instruction and not another.',
    ],
    attributes: [
        attribute('key', stringIdentifier(), {
            docs: ['The key looked up against the surrounding provide/inject graph.'],
        }),
        optionalAttribute('fallback', union('valueNode'), {
            docs: [
                'A value used when no provider supplies the key.',
                'When absent, the key is required: a provider must supply it for the surrounding context to be valid.',
            ],
        }),
    ],
});
