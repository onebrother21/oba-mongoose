import { Strings } from "@onebro/oba-common";
import { ModelSelfRefsConfig } from "./model-lvl-0-types";
import { ModelLvl1Signature } from "./model-lvl-1-types";
import { ModelLvl4Signature, ModelLvl4Types, ModelLvl4 } from "./model-lvl-4-types";
/** ALL MODEL TYPES */
export declare type ModelSignature<C, I, J, P, S extends Strings, R extends ModelSelfRefsConfig = undefined> = ModelLvl4Signature<ModelLvl1Signature<C, I, J, P, S, R>>;
export declare type ModelBaseTypes<Sig> = {
    config: ModelLvl4<Sig, "C">;
    instance: ModelLvl4<Sig, "I">;
    json: ModelLvl4<Sig, "J">;
    preview: ModelLvl4<Sig, "P">;
    statuses: ModelLvl4<Sig, "S">;
    refs: ModelLvl4<Sig, "R">;
    fetches: ModelLvl4<Sig, "F">;
    updates: ModelLvl4<Sig, "U">;
    queries: ModelLvl4<Sig, "Q">;
    model: ModelLvl4<Sig, "M">;
    ctr: ModelLvl4<Sig, "M">;
};
export declare type ModelTypes<Sig> = ModelLvl4Types<Sig> & ModelBaseTypes<Sig>;
export declare type Model<Sig> = ModelTypes<Sig>;
