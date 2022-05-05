import { Types } from "mongoose";
import { Enum, Status, Primitive, Strings, AnyBoolean, Entity } from "@onebro/oba-common";
export declare type IsObjectId = string | Types.ObjectId;
export declare type IsPrimitive = Primitive | IsObjectId;
export declare type IsPrimitiveGuard<S> = S extends IsPrimitive ? S : Partial<S>;
/** MODELSTAGES: C -> CONFIG,I -> INSTANCE,J -> JSON */
export declare type Stages = "C" | "I" | "J";
export declare type StageGuard<t> = t extends "I" ? true : false;
export declare type StageGuardAB<A, B, t> = t extends "I" ? A : B;
/** MODEL LVL 1 TYPES */
export declare type ModelObject<S, t> = Omit<Entity, "id"> & {
    id: StageGuardAB<IsObjectId, string, t>;
    status: S extends Strings ? Status<S, StageGuard<t>> : never;
    stat: string;
};
export declare type ModelObjectConfig<S> = Partial<Pick<ModelObject<S, "C">, "info" | "desc" | "status">>;
export declare type ModelObjectIdStamp<S> = Pick<ModelObject<S, "J">, "id" | "stat">;
export declare type ModelName = {
    model: string;
};
export declare type ModelMiscReference = ModelName & {
    oid: IsObjectId;
};
export declare type ModelPopulationRef = ModelName & {
    path: string;
    populate?: ModelPopulationRef[];
};
export declare type ModelSelfRefConfig = {
    arr: AnyBoolean;
    out: "J" | "P";
};
export declare type ModelSelfRefsConfig = Enum<ModelSelfRefConfig, string>;
export declare type ModelBaseTypes<C, I, J> = {
    C: C;
    I: I;
    J: J;
};
export declare type ModelSignature<C, I, J, P, S extends Strings = undefined, R extends ModelSelfRefsConfig = undefined> = ModelBaseTypes<C, I, J> & {
    P: P;
    S: S;
    R: R;
};
export declare type IsModelSignature<T> = T extends ModelSignature<infer C, infer I, infer J, infer P, infer S, infer R> ? T : never;
export declare type ModelL1<T> = {
    C: IsModelSignature<T>["C"] & ModelObjectConfig<ModelL1<T>["S"]>;
    I: IsModelSignature<T>["I"] & ModelObject<ModelL1<T>["S"], "I">;
    J: Partial<IsModelSignature<T>["J"] & ModelObject<ModelL1<T>["S"], "J">>;
    P: Partial<IsModelSignature<T>["P"] & ModelObjectIdStamp<ModelL1<T>["S"]>>;
    S: IsModelSignature<T>["S"];
    R: IsModelSignature<T>["R"];
};
