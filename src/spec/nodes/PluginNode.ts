import { attribute, defineNode, json, optionalAttribute, stringNamespace } from '../../api';
import { examples } from './PluginNode.examples';

export const pluginNode = defineNode('pluginNode', {
    docs: [
        'Attaches named, plugin-specific data to a node.',
        'A plugin is uniquely identified by its `name`; the optional `payload` carries arbitrary, consumer-defined data that only the matching plugin knows how to interpret. Codama itself treats the payload as opaque.',
        'Every node can carry plugins via the `plugins` base attribute.',
    ],
    attributes: [
        attribute('name', stringNamespace(), {
            docs: ['The unique, dot-separated namespace identifying the plugin this data belongs to (e.g. `i18n.es`).'],
        }),
        optionalAttribute('payload', json(), {
            docs: [
                'Arbitrary, plugin-specific data. Its shape is defined by the plugin, not by Codama, and is carried through the graph verbatim.',
            ],
        }),
    ],
    examples,
});
