import { Model } from "mongoose";
import { Keys } from "@onebro/oba-common";
import { IsObjectId } from "./model-lvl-0-types";
import { OfModelLvl1Signature, ModelLvl1Types, ModelLvl1 } from "./model-lvl-1-types";
/** LEVEL TWO MODEL TYPES:P -> PREVIEW,R -> SELF REFS */
export declare type ModelLvl2Signature<Sig> = OfModelLvl1Signature<Sig>;
export declare type OfModelLvl2Signature<Sig> = Sig extends ModelLvl2Signature<infer T0> ? Sig : never;
export declare type ModelSelfRefKeys<Sig> = Keys<ModelLvl1<Sig, "R">>;
export declare type ModelSelfRefArrParam<Sig, k extends ModelSelfRefKeys<Sig>> = ModelLvl2<Sig, "R">[k]["arr"];
export declare type ModelSelfRefArrGuard<Sig, k extends ModelSelfRefKeys<Sig>, U> = ModelSelfRefArrParam<Sig, k> extends true | 1 ? U[] : U;
export declare type ModelSelfRefOutParam<Sig, k extends ModelSelfRefKeys<Sig>> = ModelLvl2<Sig, "R">[k]["out"];
export declare type ModelSelfRefOutGuard<Sig, k extends ModelSelfRefKeys<Sig>, J, P> = ModelSelfRefOutParam<Sig, k> extends "J" ? J : P;
export declare type ModelSelfRefStageGuard<t, A, B, C> = t extends "C" ? A : t extends "I" ? B : C;
export declare type ModelSelfRef<Sig, k extends ModelSelfRefKeys<Sig>, t> = ModelSelfRefStageGuard<t, ModelSelfRefArrGuard<Sig, k, IsObjectId>, ModelSelfRefArrGuard<Sig, k, ModelLvl2<Sig, "I">>, ModelSelfRefArrGuard<Sig, k, ModelSelfRefOutGuard<Sig, k, ModelLvl2<Sig, "J">, ModelLvl2<Sig, "P">>>>;
export declare type ModelSelfRefsObj<Sig, t> = {
    [k in ModelSelfRefKeys<Sig>]: ModelSelfRef<Sig, k, t>;
};
export declare type ModelLvl2SelfRefs<Sig, t> = ModelLvl1<Sig, "R"> extends undefined ? {} : ModelSelfRefsObj<Sig, t>;
export declare type ModelLvl2BaseTypes<Sig> = {
    C: Partial<ModelLvl2SelfRefs<Sig, "C">>;
    I: ModelLvl2SelfRefs<Sig, "I"> & {
        json: () => ModelLvl2<Sig, "J">;
        preview: ModelLvl2<Sig, "P">;
    };
    J: Partial<ModelLvl2SelfRefs<Sig, "J">>;
    M: Model<ModelLvl2<Sig, "I">>;
};
export declare type ModelLvl2Types<Sig> = ModelLvl1Types<Sig> & ModelLvl2BaseTypes<Sig>;
export declare type ModelLvl2TypesKeys<Sig> = Keys<ModelLvl2Types<Sig>>;
export declare type ModelLvl2<Sig, k extends ModelLvl2TypesKeys<Sig>> = ModelLvl2Types<Sig>[k];
