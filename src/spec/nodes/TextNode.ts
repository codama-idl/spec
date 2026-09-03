import { attribute, defineNode, string } from '../../api';
import { examples } from './TextNode.examples';

export const textNode = defineNode('textNode', {
    docs: [
        'A piece of human-facing text carrying structured metadata — the rich arm of the `string | textNode` union used by `docs`, display intents, labels and messages.',
        'Being a node, it takes `plugins` like any other, which is how text metadata attaches without further spec changes — e.g. translations under the `i18n.*` namespace convention, where each payload is the translated content.',
        'The canonical form of plugin-free text is the plain string: a `textNode` without plugins is valid but non-canonical, which validators flag as a lint. The tree always holds exactly what the JSON says.',
        'Multi-line text uses `\\n` within `content`; whether a given attribute may be multi-line is a per-attribute convention — `docs` may, intents, labels and messages are single-line by convention.',
    ],
    attributes: [
        attribute('content', string(), {
            docs: ['The text itself, in the default language of the IDL.'],
        }),
    ],
    examples,
});
