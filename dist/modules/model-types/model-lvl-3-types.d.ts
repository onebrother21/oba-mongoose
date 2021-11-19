import { Document } from "mongoose";
import { Keys, Enum, Overwrite, NoneOfType, DotNotationObj } from "@onebro/oba-common";
import { IsObjectId } from "./model-lvl-0-types";
import { ModelLvl2Signature, ModelLvl2Types } from "./model-lvl-2-types";
import { ModifiedQueries } from "./model-lvl-3-util-types";
/** LEVEL THREE MODEL TYPES */
export declare type ModelLvl3Signature<Sig> = ModelLvl2Signature<Sig>;
export declare type OfModelLvl3Signature<Sig> = Sig extends ModelLvl3Signature<infer T0> ? Sig : never;
export declare type DocumentKeys = Keys<Document> | "json" | "preview";
export declare type NoDocumentOrFunctions<Sig> = NoneOfType<Omit<Sig, DocumentKeys>, Function>;
export declare type ModelNonCallableProps<Sig> = NoDocumentOrFunctions<Overwrite<ModelLvl3<Sig, "C">, ModelLvl3<Sig, "I">>>;
export declare type ModelNonCallable2Props<Sig> = NoDocumentOrFunctions<ModelLvl3<Sig, "J">>;
export declare type ModelQueryableProps<Sig> = DotNotationObj<ModelNonCallable2Props<Sig>>;
export declare type ModelQueryObject<Sig> = ModifiedQueries<ModelQueryableProps<Sig>>;
export declare type ModelQueryKeys<Sig> = Keys<ModelQueryableProps<Sig>>;
export declare type ModelQuerySortValues = "asc" | "desc" | 1 | -1;
export declare type ModelQuerySortParams<Sig> = Enum<ModelQuerySortValues, undefined, ModelQueryKeys<Sig>>;
export declare type ModelQueryParams<Sig> = Partial<Record<"skip" | "limit", number> & {
    sort: ModelQuerySortParams<Sig>;
}>;
export declare type ModelQuery<Sig> = {
    query: ModelQueryObject<Sig>;
    opts?: ModelQueryParams<Sig>;
    select?: "j" | "p" | "json" | "preview" | Keys<ModelLvl3<Sig, "J">>[];
};
export declare type ModelFetchObject<Sig> = IsObjectId | Partial<ModelQueryableProps<Sig>>;
export declare type Modellvl3BaseTypes<Sig> = {
    F: ModelFetchObject<Sig>;
    Q: ModelQuery<Sig>;
};
export declare type ModelLvl3Types<Sig> = ModelLvl2Types<Sig> & Modellvl3BaseTypes<Sig>;
export declare type ModelLvl3TypesKeys<Sig> = Keys<ModelLvl3Types<Sig>>;
export declare type ModelLvl3<Sig, k extends ModelLvl3TypesKeys<Sig>> = ModelLvl3Types<Sig>[k];
