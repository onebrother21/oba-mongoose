import { Document } from "mongoose";
import { Keys, OptionalEnum, Overwrite } from "@onebro/oba-common";
import { IsObjectId } from "./model-lvl-0-types";
import { ModelLvl2Types, ModelLvl2Signature } from "./model-lvl-2-types";
import { ModifiedQueries } from "./model-lvl-3-util-types";
import { NoneOfType, DotNotationObj } from "../model-utils";
/** LEVEL THREE MODEL TYPES */
export declare type ModelLvl3Types<T> = ModelLvl2Types<T>;
export declare type OfModelLvl3Types<T> = T extends ModelLvl3Types<infer T0> ? T : never;
export declare type DocumentKeys = Keys<Document> | "json" | "preview";
export declare type NoDocumentOrFunctions<T> = NoneOfType<Omit<T, DocumentKeys>, Function>;
export declare type ModelNonCallableProps<T> = NoDocumentOrFunctions<Overwrite<ModelLvl3<T, "C">, ModelLvl3<T, "I">>>;
export declare type ModelNonCallable2Props<T> = NoDocumentOrFunctions<ModelLvl3<T, "J">>;
export declare type ModelQueryableProps<T> = DotNotationObj<ModelNonCallable2Props<T>>;
export declare type ModelQueryObject<T> = ModifiedQueries<ModelQueryableProps<T>>;
export declare type ModelQueryKeys<T> = Keys<ModelQueryableProps<T>>;
export declare type ModelQuerySortValues = "asc" | "desc" | 1 | -1;
export declare type ModelQuerySortParams<T> = OptionalEnum<ModelQuerySortValues, undefined, ModelQueryKeys<T>>;
export declare type ModelQueryParams<T> = Partial<Record<"skip" | "limit", number> & {
    sort: ModelQuerySortParams<T>;
}>;
export declare type ModelQuery<T> = {
    query: ModelQueryObject<T>;
    opts?: ModelQueryParams<T>;
    select?: "j" | "p" | "json" | "preview" | Keys<ModelLvl3<T, "J">>[];
};
export declare type ModelFetchObject<T> = IsObjectId | Partial<ModelQueryableProps<T>>;
export declare type Modellvl3BaseSignature<T> = {
    F: ModelFetchObject<T>;
    Q: ModelQuery<T>;
};
export declare type ModelLvl3Signature<T> = ModelLvl2Signature<T> & Modellvl3BaseSignature<T>;
export declare type ModelLvl3SignatureKeys<T> = Keys<ModelLvl3Signature<T>>;
export declare type ModelLvl3<T, k extends ModelLvl3SignatureKeys<T>> = ModelLvl3Signature<T>[k];
