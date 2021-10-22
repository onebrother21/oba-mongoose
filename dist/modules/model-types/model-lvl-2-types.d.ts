import { Model } from "mongoose";
import { Keys } from "@onebro/oba-common";
import { IsObjectId } from "./model-lvl-0-types";
import { OfModelLvl1Types, ModelLvl1Signature, ModelLvl1 } from "./model-lvl-1-types";
/** LEVEL TWO MODEL TYPES:P -> PREVIEW,R -> SELF REFS */
export declare type ModelLvl2Types<T> = OfModelLvl1Types<T>;
export declare type OfModelLvl2Types<T> = T extends ModelLvl2Types<infer T0> ? T : never;
export declare type ModelSelfRefKeys<T> = Keys<ModelLvl1<T, "R">>;
export declare type ModelSelfRefArrParam<T, k extends ModelSelfRefKeys<T>> = ModelLvl2<T, "R">[k]["arr"];
export declare type ModelSelfRefArrGuard<T, k extends ModelSelfRefKeys<T>, U> = ModelSelfRefArrParam<T, k> extends true | 1 ? U[] : U;
export declare type ModelSelfRefOutParam<T, k extends ModelSelfRefKeys<T>> = ModelLvl2<T, "R">[k]["out"];
export declare type ModelSelfRefOutGuard<T, k extends ModelSelfRefKeys<T>, J, P> = ModelSelfRefOutParam<T, k> extends "J" ? J : P;
export declare type ModelSelfRefStageGuard<t, A, B, C> = t extends "C" ? A : t extends "I" ? B : C;
export declare type ModelSelfRef<T, k extends ModelSelfRefKeys<T>, t> = ModelSelfRefStageGuard<t, ModelSelfRefArrGuard<T, k, IsObjectId>, ModelSelfRefArrGuard<T, k, ModelLvl2<T, "I">>, ModelSelfRefArrGuard<T, k, ModelSelfRefOutGuard<T, k, ModelLvl2<T, "J">, ModelLvl2<T, "P">>>>;
export declare type ModelSelfRefsObj<T, t> = {
    [k in ModelSelfRefKeys<T>]: ModelSelfRef<T, k, t>;
};
export declare type ModelLvl2SelfRefs<T, t> = ModelLvl1<T, "R"> extends undefined ? {} : ModelSelfRefsObj<T, t>;
export declare type ModelLvl2BaseSignature<T> = {
    C: Partial<ModelLvl2SelfRefs<T, "C">>;
    I: ModelLvl2SelfRefs<T, "I"> & {
        json: () => ModelLvl2<T, "J">;
        preview: ModelLvl2<T, "P">;
    };
    J: Partial<ModelLvl2SelfRefs<T, "J">>;
    M: Model<ModelLvl2<T, "I">>;
};
export declare type ModelLvl2Signature<T> = ModelLvl1Signature<T> & ModelLvl2BaseSignature<T>;
export declare type ModelLvl2SignatureKeys<T> = Keys<ModelLvl2Signature<T>>;
export declare type ModelLvl2<T, k extends ModelLvl2SignatureKeys<T>> = ModelLvl2Signature<T>[k];
