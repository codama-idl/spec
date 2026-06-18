import { anyNode, attribute, defineNode, stringIdentifier } from '../../api';

export const providedNode = defineNode('providedNode', {
    docs: [
        'Exposes a node under a name so consumers in the surrounding scope can resolve it by that key.',
        "Sits inside a host's `provides` list and pairs with `injectedValueNode` on the consumer side: an injection with the matching key resolves to this entry's `node`.",
    ],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The key under which the node is exposed to consumers.'],
        }),
        attribute('node', anyNode(), {
            docs: [
                "The exposed node. The provider is a transparent pipe — any node may be supplied; the family check happens at the injection point against the consumer's expected family.",
            ],
        }),
    ],
});
