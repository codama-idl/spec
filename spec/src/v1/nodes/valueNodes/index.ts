import { arrayValueNode } from './ArrayValueNode';
import { booleanValueNode } from './BooleanValueNode';
import { bytesValueNode } from './BytesValueNode';
import { constantValueNode } from './ConstantValueNode';
import { enumValueNode } from './EnumValueNode';
import { mapEntryValueNode } from './MapEntryValueNode';
import { mapValueNode } from './MapValueNode';
import { noneValueNode } from './NoneValueNode';
import { numberValueNode } from './NumberValueNode';
import { publicKeyValueNode } from './PublicKeyValueNode';
import { setValueNode } from './SetValueNode';
import { someValueNode } from './SomeValueNode';
import { stringValueNode } from './StringValueNode';
import { structFieldValueNode } from './StructFieldValueNode';
import { structValueNode } from './StructValueNode';
import { tupleValueNode } from './TupleValueNode';
import { enumValuePayloadUnion, registeredValueNodeUnion, standaloneValueNodeUnion, valueNodeUnion } from './ValueNode';

export const ALL_VALUE_NODES = [
    arrayValueNode,
    booleanValueNode,
    bytesValueNode,
    constantValueNode,
    enumValueNode,
    mapEntryValueNode,
    mapValueNode,
    noneValueNode,
    numberValueNode,
    publicKeyValueNode,
    setValueNode,
    someValueNode,
    stringValueNode,
    structFieldValueNode,
    structValueNode,
    tupleValueNode,
] as const;

export const ALL_VALUE_NODE_UNIONS = [
    standaloneValueNodeUnion,
    valueNodeUnion,
    registeredValueNodeUnion,
    enumValuePayloadUnion,
] as const;
