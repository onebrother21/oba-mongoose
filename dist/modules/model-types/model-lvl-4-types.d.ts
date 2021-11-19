import { Keys, DeepPartial, AllOfType, NoneOfType } from "@onebro/oba-common";
import { IsObjectId, IsPrimitive } from "./model-lvl-0-types";
import { ModelSelfRefKeys } from "./model-lvl-2-types";
import { ModelQueryableProps, ModelLvl3Signature, ModelLvl3Types } from "./model-lvl-3-types";
/** LEVEL FOUR MODEL TYPES */
export declare type ModelLvl4Signature<Sig> = ModelLvl3Signature<Sig>;
export declare type OfModelLvl4Signature<Sig> = Sig extends ModelLvl4Signature<infer T0> ? Sig : never;
export declare type ModelNoArrayUpdateProps<Sig> = NoneOfType<ModelQueryableProps<Sig>, any[]>;
export declare type ModelNoArrayUpdateObj<Sig> = Record<"$set", ModelNoArrayUpdateProps<Sig>>;
export declare type ModelNumerableUpdateProps<Sig> = AllOfType<ModelQueryableProps<Sig>, number | Date>;
export declare type ModelNumerableUpdateObj<Sig> = Record<"$inc" | "$dec", ModelNumerableUpdateProps<Sig>>;
export declare type ModelArrUpdateProps<Sig> = AllOfType<ModelQueryableProps<Sig>, any[]>;
export declare type ModelArrUpdatePropKeys<Sig> = Keys<ModelArrUpdateProps<Sig>>;
export declare type ModelArrUpdateSignature<Sig> = Sig | Sig[] | {
    $in: Sig[];
};
export declare type ModelArrUpdateGuard<Sig> = Sig extends Array<infer S> ? ModelArrUpdateSignature<S extends IsPrimitive ? S : Partial<S>> : never;
export declare type ModelArrUpdateSelfRefGuard<Sig, k, U> = k extends ModelSelfRefKeys<Sig> ? IsObjectId[] : U;
export declare type ModelArrUpdatePropsUpd<Sig> = {
    [k in ModelArrUpdatePropKeys<Sig>]: ModelArrUpdateGuard<ModelArrUpdateSelfRefGuard<Sig, k, ModelArrUpdateProps<Sig>[k]>>;
};
export declare type ModelArrayUpdateObj<Sig> = Record<"$push" | "$pull", ModelArrUpdatePropsUpd<Sig>>;
export declare type ModelLvl4Updates<Sig> = DeepPartial<ModelNoArrayUpdateObj<Sig> & ModelNumerableUpdateObj<Sig> & ModelArrayUpdateObj<Sig>>;
export declare type ModelLvl4BaseTypes<Sig> = {
    U: ModelLvl4Updates<Sig>;
};
export declare type ModelLvl4Types<Sig> = ModelLvl3Types<Sig> & ModelLvl4BaseTypes<Sig>;
export declare type ModelLvl4TypesKeys<Sig> = Keys<ModelLvl4Types<Sig>>;
export declare type ModelLvl4<Sig, k extends ModelLvl4TypesKeys<Sig>> = ModelLvl4Types<Sig>[k];
