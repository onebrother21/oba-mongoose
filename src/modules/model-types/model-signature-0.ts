import {Types} from "mongoose";
import {Enum,Primitive,AnyBoolean} from "@onebro/oba-common";

export type IsObjectId = string|Types.ObjectId;
export type IsPrimitive = Primitive|IsObjectId;
export type IsPrimitiveGuard<S> = S extends IsPrimitive?S:Partial<S>;

/** MODELSTAGES: C -> CONFIG,I -> INSTANCE,J -> JSON */
export type Stages = "C"|"I"|"J";
export type StageGuard<t> = t extends "I"?true:false;
export type StageGuardAB<A,B,t> = t extends "I"?A:B;

export type ModelName = {model:string;};
export type ModelMiscReference<Name extends string = undefined> = Name extends undefined?ModelName:{model:Name} & {ref:IsObjectId;};
export type ModelPopulationRef = ModelName & {path:string;populate?:ModelPopulationRef[];};

export type ModelSelfRefConfig = {arr:AnyBoolean;out:"J"|"P";};//|"json"|"preview";};
export type ModelSelfRefsConfig = Enum<ModelSelfRefConfig,string>;