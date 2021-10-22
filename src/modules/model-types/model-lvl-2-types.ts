import {Model} from "mongoose";
import {Keys} from "@onebro/oba-common";
import {IsObjectId} from "./model-lvl-0-types";
import {OfModelLvl1Types,ModelLvl1Signature,ModelLvl1} from "./model-lvl-1-types";

/** LEVEL TWO MODEL TYPES:P -> PREVIEW,R -> SELF REFS */
export type ModelLvl2Types<T> = OfModelLvl1Types<T>;
export type OfModelLvl2Types<T> = T extends ModelLvl2Types<infer T0>?T:never;

export type ModelSelfRefKeys<T> = Keys<ModelLvl1<T,"R">>;
export type ModelSelfRefArrParam<T,k extends ModelSelfRefKeys<T>> = ModelLvl2<T,"R">[k]["arr"];
export type ModelSelfRefArrGuard<T,k extends ModelSelfRefKeys<T>,U> = ModelSelfRefArrParam<T,k> extends true|1?U[]:U;
export type ModelSelfRefOutParam<T,k extends ModelSelfRefKeys<T>> = ModelLvl2<T,"R">[k]["out"];
export type ModelSelfRefOutGuard<T,k extends ModelSelfRefKeys<T>,J,P> = ModelSelfRefOutParam<T,k> extends "J"?J:P;
export type ModelSelfRefStageGuard<t,A,B,C> = t extends "C"?A:t extends "I"?B:C;

export type ModelSelfRef<T,k extends ModelSelfRefKeys<T>,t> =
ModelSelfRefStageGuard<t,
ModelSelfRefArrGuard<T,k,IsObjectId>,
ModelSelfRefArrGuard<T,k,ModelLvl2<T,"I">>,
ModelSelfRefArrGuard<T,k,ModelSelfRefOutGuard<T,k,ModelLvl2<T,"J">,ModelLvl2<T,"P">>>>;
export type ModelSelfRefsObj<T,t> = {[k in ModelSelfRefKeys<T>]:ModelSelfRef<T,k,t>;};
export type ModelLvl2SelfRefs<T,t> = ModelLvl1<T,"R"> extends undefined?{}:ModelSelfRefsObj<T,t>;

export type ModelLvl2BaseSignature<T> = {
  C:Partial<ModelLvl2SelfRefs<T,"C">>;
  I:ModelLvl2SelfRefs<T,"I"> & {json:() => ModelLvl2<T,"J">;preview:ModelLvl2<T,"P">;};
  J:Partial<ModelLvl2SelfRefs<T,"J">>;
  M:Model<ModelLvl2<T,"I">>;
};
export type ModelLvl2Signature<T> = ModelLvl1Signature<T> & ModelLvl2BaseSignature<T>;
export type ModelLvl2SignatureKeys<T> = Keys<ModelLvl2Signature<T>>;
export type ModelLvl2<T,k extends ModelLvl2SignatureKeys<T>> = ModelLvl2Signature<T>[k];