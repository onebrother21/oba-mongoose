
import {Types} from "mongoose";
import {Enum,Status,Primitive,Strings,AnyBoolean,Entity} from "@onebro/oba-common";

export type IsObjectId = string|Types.ObjectId;
export type IsPrimitive = Primitive|IsObjectId;
export type IsPrimitiveGuard<S> = S extends IsPrimitive?S:Partial<S>;

/** MODELSTAGES: C -> CONFIG,I -> INSTANCE,J -> JSON */
export type Stages = "C"|"I"|"J";
export type StageGuard<t> = t extends "I"?true:false;
export type StageGuardAB<A,B,t> = t extends "I"?A:B;

/** MODEL LVL 1 TYPES */
export type ModelObject<S,t> = Omit<Entity,"id"> & {
  id:StageGuardAB<IsObjectId,string,t>;
  status:S extends Strings?Status<S,StageGuard<t>>:never;
  stat:string;
};
export type ModelObjectConfig<S> = Partial<Pick<ModelObject<S,"C">,"info"|"desc"|"status">>;
export type ModelObjectIdStamp<S> = Pick<ModelObject<S,"J">,"id"|"stat">;

export type ModelName = {model:string;};
export type ModelMiscReference = ModelName & {oid:IsObjectId;};
export type ModelPopulationRef = ModelName & {path:string;populate?:ModelPopulationRef[];};

export type ModelSelfRefConfig = {arr:AnyBoolean;out:"J"|"P";};//|"json"|"preview";};
export type ModelSelfRefsConfig = Enum<ModelSelfRefConfig,string>;

export type ModelBaseTypes<C,I,J> = {C:C;I:I;J:J;};
export type ModelSignature<C,I,J,P,
S extends Strings = undefined,
R extends ModelSelfRefsConfig = undefined> = ModelBaseTypes<C,I,J> & {P:P;S:S;R:R;};
export type IsModelSignature<T> = T extends ModelSignature<infer C,infer I,infer J,infer P,infer S,infer R>?T:never;
export type ModelL1<T> = {
  C:IsModelSignature<T>["C"] & ModelObjectConfig<ModelL1<T>["S"]>;
  I:IsModelSignature<T>["I"] & ModelObject<ModelL1<T>["S"],"I">;
  J:Partial<IsModelSignature<T>["J"] & ModelObject<ModelL1<T>["S"],"J">>;
  P:Partial<IsModelSignature<T>["P"] & ModelObjectIdStamp<ModelL1<T>["S"]>>;
  S:IsModelSignature<T>["S"];
  R:IsModelSignature<T>["R"];
};