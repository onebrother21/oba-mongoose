import { Status,Strings,Entity } from "@onebro/oba-common";
import { StageGuardAB,StageGuard,IsObjectId,ModelSelfRefsConfig } from "./model-signature-0";

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
  J:Pick<ModelObject<S,"J">,"id"> & Partial<J & ModelObject<S,"J">>;
  P:Pick<ModelObject<S,"J">,"id"> & Partial<P & Pick<ModelObject<S,"J">,"stat">>;
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