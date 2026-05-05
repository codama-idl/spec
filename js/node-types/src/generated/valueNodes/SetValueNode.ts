import type { ValueNode } from './ValueNode';

/** A concrete set value: a list of unique value nodes. */
export interface SetValueNode<TItems extends ValueNode[] = ValueNode[]> {
    readonly kind: 'setValueNode';

    // Children.
    /** The items of the set. */
    readonly items: TItems;
}
