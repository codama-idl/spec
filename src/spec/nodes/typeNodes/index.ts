import { arrayTypeNode } from './ArrayTypeNode';
import { booleanTypeNode } from './BooleanTypeNode';
import { bytesTypeNode } from './BytesTypeNode';
import { dateTimeTypeNode } from './DateTimeTypeNode';
import { durationTypeNode } from './DurationTypeNode';
import { enumTypeNode } from './EnumTypeNode';
import { enumVariantTypeNode } from './EnumVariantTypeNode';
import { fixedPointTypeNode } from './FixedPointTypeNode';
import { floatTypeNode } from './FloatTypeNode';
import { integerTypeNode } from './IntegerTypeNode';
import { mapTypeNode } from './MapTypeNode';
import { optionTypeNode } from './OptionTypeNode';
import { publicKeyTypeNode } from './PublicKeyTypeNode';
import { remainderOptionTypeNode } from './RemainderOptionTypeNode';
import { setTypeNode } from './SetTypeNode';
import { stringTypeNode } from './StringTypeNode';
import { structFieldTypeNode } from './StructFieldTypeNode';
import { structTypeNode } from './StructTypeNode';
import { tupleTypeNode } from './TupleTypeNode';
import { registeredTypeNodeUnion, standaloneTypeNodeUnion, typeNodeUnion } from './TypeNode';
import { zeroableOptionTypeNode } from './ZeroableOptionTypeNode';

export const ALL_TYPE_NODES = [
    arrayTypeNode,
    booleanTypeNode,
    bytesTypeNode,
    dateTimeTypeNode,
    durationTypeNode,
    enumTypeNode,
    enumVariantTypeNode,
    fixedPointTypeNode,
    floatTypeNode,
    integerTypeNode,
    mapTypeNode,
    optionTypeNode,
    publicKeyTypeNode,
    remainderOptionTypeNode,
    setTypeNode,
    stringTypeNode,
    structFieldTypeNode,
    structTypeNode,
    tupleTypeNode,
    zeroableOptionTypeNode,
] as const;

export const ALL_TYPE_NODE_UNIONS = [standaloneTypeNodeUnion, typeNodeUnion, registeredTypeNodeUnion] as const;
