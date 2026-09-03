import { attribute, defineNode, json, optionalAttribute, stringNamespace } from '../../api';
import { examples } from './PluginNode.examples';

export const pluginNode = defineNode('pluginNode', {
    docs: [
        'Attaches namespaced, plugin-specific data to a node.',
        'A plugin is uniquely identified by its `namespace`; the optional `payload` carries arbitrary, consumer-defined data that only the matching plugin knows how to interpret. Codama itself treats the payload as opaque.',
        'Every node can carry plugins via the `plugins` base attribute.',
    ],
    attributes: [
        attribute('namespace', stringNamespace(), {
            docs: [
                'The unique, dot-separated namespace identifying the plugin this data belongs to (e.g. `i18n.es`).',
                'There is no central registry; to keep namespaces unambiguous, prefix them with a name you control — a package, crate or organisation name. Avoid the `codama.*` prefix, which may conflict with experimental Codama features in the future.',
            ],
        }),
        optionalAttribute('payload', json(), {
            docs: [
                'Arbitrary, plugin-specific data. Its shape is defined by the plugin, not by Codama, and is carried through the graph verbatim.',
                'Payloads are inert data: they are never traversed by visitors and never validated, and identifier references inside them are not maintained by tree transformations — a payload that mimics node shapes gets none of a node\u2019s guarantees.',
                'Plugins never change the meaning of the node they decorate — its byte layout, resolution semantics or any other behaviour; they only annotate it. Consumers that do not recognise a namespace can therefore safely ignore the plugin.',
            ],
        }),
    ],
    examples,
});
