import {Keys,DeepPartial,AllOfType,NoneOfType} from "@onebro/oba-common";
import {IsObjectId,IsPrimitive} from "./model-lvl-0-types";
import {ModelSelfRefKeys} from "./model-lvl-2-types";
import {ModelQueryableProps,ModelLvl3Signature,ModelLvl3Types} from "./model-lvl-3-types";

/** LEVEL FOUR MODEL TYPES */
export type ModelLvl4Signature<Sig> = ModelLvl3Signature<Sig>;
export type OfModelLvl4Signature<Sig> = Sig extends ModelLvl4Signature<infer T0>?Sig:never;

export type ModelNoArrayUpdateProps<Sig> = NoneOfType<ModelQueryableProps<Sig>,any[]>;
export type ModelNoArrayUpdateObj<Sig> = Record<"$set",ModelNoArrayUpdateProps<Sig>>;

export type ModelNumerableUpdateProps<Sig> = AllOfType<ModelQueryableProps<Sig>,number|Date>;
export type ModelNumerableUpdateObj<Sig> = Record<"$inc"|"$dec",ModelNumerableUpdateProps<Sig>>;

export type ModelArrUpdateProps<Sig> = AllOfType<ModelQueryableProps<Sig>,any[]>;
export type ModelArrUpdatePropKeys<Sig> = Keys<ModelArrUpdateProps<Sig>>;
export type ModelArrUpdateSignature<Sig> = Sig|Sig[]|{$in:Sig[]};
export type ModelArrUpdateGuard<Sig> = Sig extends Array<infer S>?ModelArrUpdateSignature<S extends IsPrimitive?S:Partial<S>>:never;
export type ModelArrUpdateSelfRefGuard<Sig,k,U> = k extends ModelSelfRefKeys<Sig>?IsObjectId[]:U;
export type ModelArrUpdatePropsUpd<Sig> = {[k in ModelArrUpdatePropKeys<Sig>]:
ModelArrUpdateGuard<ModelArrUpdateSelfRefGuard<Sig,k,ModelArrUpdateProps<Sig>[k]>>;};
export type ModelArrayUpdateObj<Sig> = Record<"$push"|"$pull",ModelArrUpdatePropsUpd<Sig>>;

export type ModelLvl4Updates<Sig> = DeepPartial<ModelNoArrayUpdateObj<Sig>&ModelNumerableUpdateObj<Sig>&ModelArrayUpdateObj<Sig>>;

export type ModelLvl4BaseTypes<Sig> = {U:ModelLvl4Updates<Sig>;};
export type ModelLvl4Types<Sig> = ModelLvl3Types<Sig> & ModelLvl4BaseTypes<Sig>;
export type ModelLvl4TypesKeys<Sig> = Keys<ModelLvl4Types<Sig>>;
export type ModelLvl4<Sig,k extends ModelLvl4TypesKeys<Sig>> = ModelLvl4Types<Sig>[k];