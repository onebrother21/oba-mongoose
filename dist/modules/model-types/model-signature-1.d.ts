import { Types } from "mongoose";
import { Enum, Status, Primitive, Strings, AnyBoolean, Entity } from "@onebro/oba-common";
export declare type IsObjectId = string | Types.ObjectId;
export declare type IsPrimitive = Primitive | IsObjectId;
export declare type IsPrimitiveGuard<S> = S extends IsPrimitive ? S : Partial<S>;
/** MODELSTAGES: C -> CONFIG,I -> INSTANCE,J -> JSON */
export declare type Stages = "C" | "I" | "J";
export declare type StageGuard<t> = t extends "I" ? true : false;
export declare type StageGuardAB<A, B, t> = t extends "I" ? A : B;
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
/** MODEL LVL 1 TYPES */
export declare type ModelObjectID<t> = StageGuardAB<IsObjectId, string, t>;
export declare type ModelObjectStatus<S, t> = S extends Strings ? Status<S, StageGuard<t>> : never;
export declare type ModelObject<S, t> = Omit<Entity, "id"> & {
    id: ModelObjectID<t>;
    status: ModelObjectStatus<S, t>;
    stat: string;
};
export declare type ModelBaseTypeSig<C, I, J> = {
    C: C;
    I: I;
    J: J;
};
export declare type ModelSignature<C, I, J, P, S extends Strings = undefined, R extends ModelSelfRefsConfig = undefined> = ModelBaseTypeSig<C, I, J> & {
    P: P;
    S: S;
    R: R;
};
export declare type IsModelSignature<T> = T extends ModelSignature<infer C, infer I, infer J, infer P, infer S, infer R> ? {
    C: C & Partial<Pick<ModelObject<S, "C">, "info" | "desc" | "status">>;
    I: I & ModelObject<S, "I">;
    J: Partial<J & ModelObject<S, "J">>;
    P: Partial<P & Pick<ModelObject<S, "J">, "id" | "stat">>;
    S: S;
    R: R;
} : never;
export declare type ModelL1Type<T> = {
    C: IsModelSignature<T>["C"];
    I: IsModelSignature<T>["I"];
    J: IsModelSignature<T>["J"];
    P: IsModelSignature<T>["P"];
    S: IsModelSignature<T>["S"];
    R: IsModelSignature<T>["R"];
};
export interface ModelL1<T> extends ModelL1Type<T> {
}
