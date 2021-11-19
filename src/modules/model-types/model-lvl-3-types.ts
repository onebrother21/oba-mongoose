import {Document} from "mongoose";
import {Keys,Enum,Overwrite,NoneOfType,DotNotationObj} from "@onebro/oba-common";
import {IsObjectId} from "./model-lvl-0-types";
import {ModelLvl2Signature,ModelLvl2Types} from "./model-lvl-2-types";
import {ModifiedQueries} from "./model-lvl-3-util-types";

/** LEVEL THREE MODEL TYPES */
export type ModelLvl3Signature<Sig> = ModelLvl2Signature<Sig>;
export type OfModelLvl3Signature<Sig> = Sig extends ModelLvl3Signature<infer T0>?Sig:never;

export type DocumentKeys = Keys<Document>|"json"|"preview";
export type NoDocumentOrFunctions<Sig> = NoneOfType<Omit<Sig,DocumentKeys>,Function>;
export type ModelNonCallableProps<Sig> = NoDocumentOrFunctions<Overwrite<ModelLvl3<Sig,"C">,ModelLvl3<Sig,"I">>>;
export type ModelNonCallable2Props<Sig> = NoDocumentOrFunctions<ModelLvl3<Sig,"J">>;
export type ModelQueryableProps<Sig> = DotNotationObj<ModelNonCallable2Props<Sig>>;

export type ModelQueryObject<Sig> = ModifiedQueries<ModelQueryableProps<Sig>>;
export type ModelQueryKeys<Sig> = Keys<ModelQueryableProps<Sig>>;
export type ModelQuerySortValues = "asc"|"desc"|1|-1;
export type ModelQuerySortParams<Sig> = Enum<ModelQuerySortValues,undefined,ModelQueryKeys<Sig>>;
export type ModelQueryParams<Sig> = Partial<Record<"skip"|"limit",number> & {sort:ModelQuerySortParams<Sig>;}>;
export type ModelQuery<Sig> = {
  query:ModelQueryObject<Sig>;
  opts?:ModelQueryParams<Sig>;
  select?:"j"|"p"|"json"|"preview"|Keys<ModelLvl3<Sig,"J">>[];
};
export type ModelFetchObject<Sig> = IsObjectId|Partial<ModelQueryableProps<Sig>>;//|LogicQueries<ModelQueryableProps<Sig>>;

export type Modellvl3BaseTypes<Sig> = {
  F:ModelFetchObject<Sig>;
  Q:ModelQuery<Sig>;
};
export type ModelLvl3Types<Sig> = ModelLvl2Types<Sig> & Modellvl3BaseTypes<Sig>;
export type ModelLvl3TypesKeys<Sig> = Keys<ModelLvl3Types<Sig>>;
export type ModelLvl3<Sig,k extends ModelLvl3TypesKeys<Sig>> = ModelLvl3Types<Sig>[k];