
import {Types} from "mongoose";
import {Enum,Status,Primitive,Strings,AnyBoolean,Entity} from "@onebro/oba-common";

export type IsObjectId = string|Types.ObjectId;
export type IsPrimitive = Primitive|IsObjectId;
export type IsPrimitiveGuard<S> = S extends IsPrimitive?S:Partial<S>;

/** MODELSTAGES: C -> CONFIG,I -> INSTANCE,J -> JSON */
export type Stages = "C"|"I"|"J";
export type StageGuard<t> = t extends "I"?true:false;
export type StageGuardAB<A,B,t> = t extends "I"?A:B;

export type ModelName = {model:string;};
export type ModelMiscReference = ModelName & {oid:IsObjectId;};
export type ModelPopulationRef = ModelName & {path:string;populate?:ModelPopulationRef[];};

export type ModelSelfRefConfig = {arr:AnyBoolean;out:"J"|"P";};//|"json"|"preview";};
export type ModelSelfRefsConfig = Enum<ModelSelfRefConfig,string>;

/** MODEL LVL 1 TYPES */
export type ModelObjectID<t> = StageGuardAB<IsObjectId,string,t>;
export type ModelObjectStatus<S,t> = S extends Strings?Status<S,StageGuard<t>>:never;
export type ModelObject<S,t> = Omit<Entity,"id"> & {
  id:ModelObjectID<t>;
  status:ModelObjectStatus<S,t>;
  stat:string;
};
export type ModelBaseTypeSig<C,I,J> = {C:C;I:I;J:J;};
export type ModelSignature<C,I,J,P,
S extends Strings = undefined,
R extends ModelSelfRefsConfig = undefined> = ModelBaseTypeSig<C,I,J> & {P:P;S:S;R:R;};
export type IsModelSignature<T> = T extends ModelSignature<infer C,infer I,infer J,infer P,infer S,infer R>?{
  C:C & Partial<Pick<ModelObject<S,"C">,"info"|"desc"|"status">>;
  I:I & ModelObject<S,"I">;
  J:Partial<J & ModelObject<S,"J">>;
  P:Partial<P & Pick<ModelObject<S,"J">,"id"|"stat">>;
  S:S;
  R:R;
}:never;
export type ModelL1Type<T> = {
  C:IsModelSignature<T>["C"];
  I:IsModelSignature<T>["I"];
  J:IsModelSignature<T>["J"];
  P:IsModelSignature<T>["P"];
  S:IsModelSignature<T>["S"];
  R:IsModelSignature<T>["R"];
};
export interface ModelL1<T> extends ModelL1Type<T> {}