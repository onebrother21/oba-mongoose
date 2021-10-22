import { Document } from "mongoose";
import { Keys, Strings } from "@onebro/oba-common";
import { ModelObject, ModelObjectConfig, ModelObjectIdStamp, ModelSelfRefsConfig, ModelAsPropTypes } from "./model-lvl-0-types";
/** LEVEL 1 MODEL TYPES */
export declare type ModelLvl1Types<C, I, J, P, S extends Strings = undefined, R extends ModelSelfRefsConfig = undefined> = ModelAsPropTypes<C, I, J> & {
    P: P;
    S: S;
    R: R;
};
export declare type OfModelLvl1Types<T> = T extends ModelLvl1Types<infer C, infer I, infer J, infer P, infer S, infer R> ? T : never;
export declare type ModelLvl1BaseSignature<T> = {
    C: OfModelLvl1Types<T>["C"] & ModelObjectConfig<ModelLvl1<T, "S">>;
    I: OfModelLvl1Types<T>["I"] & ModelObject<ModelLvl1<T, "S">, "I"> & Document;
    J: Partial<OfModelLvl1Types<T>["J"] & ModelObject<ModelLvl1<T, "S">, "J">>;
    P: Partial<OfModelLvl1Types<T>["P"] & ModelObjectIdStamp<ModelLvl1<T, "S">>>;
    S: OfModelLvl1Types<T>["S"];
    R: OfModelLvl1Types<T>["R"];
};
export declare type ModelLvl1Signature<T> = ModelLvl1BaseSignature<T>;
export declare type ModelLvl1SignatureKeys<T> = Keys<ModelLvl1Signature<T>>;
export declare type ModelLvl1<T, k extends ModelLvl1SignatureKeys<T>> = ModelLvl1Signature<T>[k];
