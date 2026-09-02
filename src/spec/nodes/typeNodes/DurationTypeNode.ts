import { attribute, defineNode, node, optionalAttribute, u32 } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './DurationTypeNode.examples';

export const durationTypeNode = defineNode('durationTypeNode', {
    docs: [
        'An elapsed duration encoded as an integer count of ticks.',
        'Renderers typically format the value as `HH:mm:ss` or a coarser human-readable form.',
    ],
    attributes: [
        optionalAttribute('ticksPerSecond', u32(), {
            docs: [
                'How many ticks make one second. Defaults to `1` (the value is already in seconds).',
                'Common choices are `1000` (milliseconds), `1000000` (microseconds), and `1000000000` (nanoseconds).',
            ],
        }),
        attribute('number', node('integerTypeNode'), {
            docs: [
                'The integer type used to serialise the tick count — a pure encoding slot.',
                'It must not carry a `unit` or `display` of its own.',
            ],
        }),
        transformsAttribute(),
    ],
    examples,
});
