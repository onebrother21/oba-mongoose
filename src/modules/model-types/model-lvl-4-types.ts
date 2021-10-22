import {Keys,DeepPartial} from "@onebro/oba-common";
import {IsObjectId,IsPrimitive} from "./model-lvl-0-types";
import {ModelSelfRefKeys} from "./model-lvl-2-types";
import {ModelQueryableProps,ModelLvl3Types,ModelLvl3Signature} from "./model-lvl-3-types";
import {AllOfType,NoneOfType} from "../model-utils";

/** LEVEL FOUR MODEL TYPES */
export type ModelLvl4Types<T> = ModelLvl3Types<T>;
export type OfModelLvl4Types<T> = T extends ModelLvl4Types<infer T0>?T:never;

export type ModelNoArrayUpdateProps<T> = NoneOfType<ModelQueryableProps<T>,any[]>;
export type ModelNoArrayUpdateObj<T> = Record<"$set",ModelNoArrayUpdateProps<T>>;

export type ModelNumerableUpdateProps<T> = AllOfType<ModelQueryableProps<T>,number|Date>;
export type ModelNumerableUpdateObj<T> = Record<"$inc"|"$dec",ModelNumerableUpdateProps<T>>;

export type ModelArrUpdateProps<T> = AllOfType<ModelQueryableProps<T>,any[]>;
export type ModelArrUpdatePropKeys<T> = Keys<ModelArrUpdateProps<T>>;
export type ModelArrUpdateTypes<T> = T|T[]|{$in:T[]};
export type ModelArrUpdateGuard<T> = T extends Array<infer S>?ModelArrUpdateTypes<S extends IsPrimitive?S:Partial<S>>:never;
export type ModelArrUpdateSelfRefGuard<T,k,U> = k extends ModelSelfRefKeys<T>?IsObjectId[]:U;
export type ModelArrUpdatePropsUpd<T> = {[k in ModelArrUpdatePropKeys<T>]:ModelArrUpdateGuard<ModelArrUpdateSelfRefGuard<T,k,ModelArrUpdateProps<T>[k]>>;};
export type ModelArrayUpdateObj<T> = Record<"$push"|"$pull",ModelArrUpdatePropsUpd<T>>;

export type ModelLvl4Updates<T> = DeepPartial<ModelNoArrayUpdateObj<T>&ModelNumerableUpdateObj<T>&ModelArrayUpdateObj<T>>;

export type ModelLvl4BaseSignature<T> = {U:ModelLvl4Updates<T>;};
export type ModelLvl4Signature<T> = ModelLvl3Signature<T> & ModelLvl4BaseSignature<T>;
export type ModelLvl4SignatureKeys<T> = Keys<ModelLvl4Signature<T>>;
export type ModelLvl4<T,k extends ModelLvl4SignatureKeys<T>> = ModelLvl4Signature<T>[k];