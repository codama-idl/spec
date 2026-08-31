import { amountTypeNode } from './AmountTypeNode';
import { arrayTypeNode } from './ArrayTypeNode';
import { booleanTypeNode } from './BooleanTypeNode';
import { bytesTypeNode } from './BytesTypeNode';
import { dateTimeTypeNode } from './DateTimeTypeNode';
import { enumEmptyVariantTypeNode } from './EnumEmptyVariantTypeNode';
import { enumStructVariantTypeNode } from './EnumStructVariantTypeNode';
import { enumTupleVariantTypeNode } from './EnumTupleVariantTypeNode';
import { enumTypeNode } from './EnumTypeNode';
import { mapTypeNode } from './MapTypeNode';
import { numberTypeNode } from './NumberTypeNode';
import { optionTypeNode } from './OptionTypeNode';
import { publicKeyTypeNode } from './PublicKeyTypeNode';
import { remainderOptionTypeNode } from './RemainderOptionTypeNode';
import { setTypeNode } from './SetTypeNode';
import { solAmountTypeNode } from './SolAmountTypeNode';
import { stringTypeNode } from './StringTypeNode';
import { structFieldTypeNode } from './StructFieldTypeNode';
import { structTypeNode } from './StructTypeNode';
import { tupleTypeNode } from './TupleTypeNode';
import { enumVariantTypeNodeUnion, registeredTypeNodeUnion, standaloneTypeNodeUnion, typeNodeUnion } from './TypeNode';
import { zeroableOptionTypeNode } from './ZeroableOptionTypeNode';

export const ALL_TYPE_NODES = [
    amountTypeNode,
    arrayTypeNode,
    booleanTypeNode,
    bytesTypeNode,
    dateTimeTypeNode,
    enumEmptyVariantTypeNode,
    enumStructVariantTypeNode,
    enumTupleVariantTypeNode,
    enumTypeNode,
    mapTypeNode,
    numberTypeNode,
    optionTypeNode,
    publicKeyTypeNode,
    remainderOptionTypeNode,
    setTypeNode,
    solAmountTypeNode,
    stringTypeNode,
    structFieldTypeNode,
    structTypeNode,
    tupleTypeNode,
    zeroableOptionTypeNode,
] as const;

export const ALL_TYPE_NODE_UNIONS = [
    standaloneTypeNodeUnion,
    enumVariantTypeNodeUnion,
    typeNodeUnion,
    registeredTypeNodeUnion,
] as const;
