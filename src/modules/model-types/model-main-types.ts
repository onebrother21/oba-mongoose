import {Keys,Strings} from "@onebro/oba-common";
import {ModelSelfRefsConfig} from "./model-lvl-0-types";
import {ModelLvl1Types} from "./model-lvl-1-types";
import {ModelLvl4Types,ModelLvl4Signature} from "./model-lvl-4-types";

/** ALL MODEL TYPES */
export type ModelTypes<C,I,J,P,S extends Strings,R extends ModelSelfRefsConfig = undefined> = ModelLvl4Types<ModelLvl1Types<C,I,J,P,S,R>>;
export type ModelBaseSignature<T> = {
  config:ModelLvl4Signature<T>["C"];
  instance:ModelLvl4Signature<T>["I"];
  json:ModelLvl4Signature<T>["J"];
  preview:ModelLvl4Signature<T>["P"];
  statuses:ModelLvl4Signature<T>["S"];
  refs:ModelLvl4Signature<T>["R"];
  fetches:ModelLvl4Signature<T>["F"];
  updates:ModelLvl4Signature<T>["U"];
  queries:ModelLvl4Signature<T>["Q"];
  model:ModelLvl4Signature<T>["M"];
};
export type ModelSignature<T> = ModelLvl4Signature<T> & ModelBaseSignature<T>;
export type ModelSignatureKeys<T> = Keys<ModelSignature<T>>;
export type ModelType<T,k extends ModelSignatureKeys<T>> = ModelSignature<T>[k];

export type ModelConfig<T> = ModelType<T,"C">;
export type ModelInstance<T> = ModelType<T,"I">;
export type ModelJson<T> = ModelType<T,"J">;
export type ModelPreview<T> = ModelType<T,"P">;
export type ModelStatuses<T> = ModelType<T,"S">;
export type ModelSelfRefs<T> = ModelType<T,"R">;
export type ModelFetches<T> = ModelType<T,"F">;
export type ModelUpdates<T> = ModelType<T,"U">;
export type ModelQueries<T> = ModelType<T,"Q">;
export type ModelDBModel<T> = ModelType<T,"M">;