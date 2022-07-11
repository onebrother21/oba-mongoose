import { Types } from "mongoose";
import { Primitive, AnyBoolean } from "@onebro/oba-common";
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
export declare type ModelMiscReference<Name extends string = undefined> = Name extends undefined ? ModelName : {
    model: Name;
} & {
    ref: IsObjectId;
};
export declare type ModelPopulationRef = ModelName & {
    path: string;
    populate?: ModelPopulationRef[];
};
export declare type ModelSelfRefConfig = {
    arr: AnyBoolean;
    out: "J" | "P";
};
export declare type ModelSelfRefsConfig = Record<string, ModelSelfRefConfig>;
