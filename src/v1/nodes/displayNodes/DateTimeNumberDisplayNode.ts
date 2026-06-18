import { defineNode, optionalAttribute, u64 } from '../../../api';

export const dateTimeNumberDisplayNode = defineNode('dateTimeNumberDisplayNode', {
    docs: [
        'Display metadata that presents a number as a point in time.',
        'The underlying value counts ticks since the Unix epoch; `ticksPerSecond` is the divisor that converts those ticks back to seconds.',
    ],
    attributes: [
        optionalAttribute('ticksPerSecond', u64(), {
            docs: [
                'How many ticks make one second. Defaults to `1` (the value is already in seconds).',
                'Common choices are `1000` (milliseconds), `1000000` (microseconds), and `1000000000` (nanoseconds).',
            ],
        }),
    ],
});
