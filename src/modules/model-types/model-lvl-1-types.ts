import {Document} from "mongoose";
import {Keys,Strings} from "@onebro/oba-common";
import {
  ModelObject,
  ModelObjectConfig,
  ModelObjectIdStamp,
  ModelSelfRefsConfig,
  ModelLvl0Signature,
} from "./model-lvl-0-types";

/** LEVEL 1 MODEL TYPES */
export type ModelLvl1Signature<C,I,J,P,S extends Strings = undefined,R extends ModelSelfRefsConfig = undefined> = ModelLvl0Signature<C,I,J> & {P:P;S:S;R:R;};
export type OfModelLvl1Signature<Sig> = Sig extends ModelLvl1Signature<infer C,infer I,infer J,infer P,infer S,infer R>?Sig:never;

export type ModelLvl1BaseTypes<Sig> = {
  C:OfModelLvl1Signature<Sig>["C"] & ModelObjectConfig<ModelLvl1<Sig,"S">>;
  I:OfModelLvl1Signature<Sig>["I"] & ModelObject<ModelLvl1<Sig,"S">,"I"> & Document;
  J:Partial<OfModelLvl1Signature<Sig>["J"] & ModelObject<ModelLvl1<Sig,"S">,"J">>;
  P:Partial<OfModelLvl1Signature<Sig>["P"] & ModelObjectIdStamp<ModelLvl1<Sig,"S">>>;
  S:OfModelLvl1Signature<Sig>["S"];
  R:OfModelLvl1Signature<Sig>["R"];
};
export type ModelLvl1Types<Sig> = ModelLvl1BaseTypes<Sig>;
export type ModelLvl1TypesKeys<Sig> = Keys<ModelLvl1Types<Sig>>;
export type ModelLvl1<Sig,k extends ModelLvl1TypesKeys<Sig>> = ModelLvl1Types<Sig>[k];