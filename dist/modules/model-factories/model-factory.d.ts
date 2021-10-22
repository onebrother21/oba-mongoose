import { Schema, SchemaOptions, SchemaTypeOpts } from "mongoose";
import OBACoreApi from "@onebro/oba-core-api";
import { Enum, DataMap } from "@onebro/oba-common";
import { IsObjectId, ModelConfig, ModelInstance, ModelJson, ModelStatuses, ModelFetches, ModelUpdates, ModelQueries, ModelDBModel, ModelPopulationRef } from "../model-types";
import { AllOfType } from "../model-utils";
export declare type SchemaDefinition = DataMap<SchemaTypeOpts<any>>;
export declare type ModelFactoryConfig<T> = {
    modelName: string;
    businessName: string;
    collectionName: string;
    definition: SchemaDefinition;
    refs: ModelPopulationRef[];
    virtuals: Enum<string, {
        get?: (...a: any) => any;
        set?: (...a: any) => void;
    }>;
    methods: Partial<AllOfType<ModelInstance<T>, Function>>;
    statuses: ModelStatuses<T>;
    opts: SchemaOptions;
};
export interface ModelFactory<T> {
    core: OBACoreApi<null>;
    model: ModelDBModel<T>;
    config: ModelFactoryConfig<T>;
    autopopulate: (o: ModelInstance<T>, s?: boolean | 0 | 1) => Promise<ModelInstance<T>>;
    create_: (c: ModelConfig<T>) => Promise<ModelInstance<T>>;
    create: (c: ModelConfig<T>) => Promise<ModelInstance<T>>;
    find: (q: ModelFetches<T>) => Promise<ModelInstance<T>>;
    findR: (q: ModelFetches<T>) => Promise<ModelInstance<T>>;
    fetch: (q: ModelFetches<T>) => Promise<ModelInstance<T>>;
    exists: (q: ModelFetches<T>) => Promise<boolean>;
    shouldNotExist: (q: ModelFetches<T>) => Promise<void>;
    update_: (q: ModelFetches<T>, u: ModelUpdates<T>) => Promise<ModelInstance<T>>;
    update: (q: ModelFetches<T>, u: ModelUpdates<T>) => Promise<ModelInstance<T>>;
    updateMany: (q: ModelFetches<T>, u: ModelUpdates<T>) => Promise<ModelInstance<T>[]>;
    remove_: (q: ModelFetches<T>) => Promise<ModelInstance<T>>;
    remove: (q: ModelFetches<T>) => Promise<ModelInstance<T>>;
    removeMany: (q: ModelFetches<T>) => Promise<(ModelInstance<T>)[]>;
    query: (q: ModelQueries<T>) => Promise<ModelJson<T>[]>;
    search: (q: string) => Promise<ModelJson<T>[]>;
    count: (q?: ModelQueries<T>) => Promise<number | any>;
}
export declare class ModelFactory<T> {
    core: OBACoreApi<null>;
    config: ModelFactoryConfig<T>;
    get m(): import("mongoose").Model<import("../model-types").OfModelLvl1Types<T>["I"] & Partial<{
        desc: string;
    } & import("../model-types").MiscInfoObj> & Record<"created" | "updated", Date> & Record<"stat", string> & {
        id: IsObjectId;
        status: import("../model-types").Status<import("../model-types").OfModelLvl1Types<T>["S"], "I">;
    } & import("mongoose").Document & import("../model-types").ModelLvl2SelfRefs<T, "I"> & {
        json: () => Partial<import("../model-types").OfModelLvl1Types<T>["J"] & Partial<{
            desc: string;
        } & import("../model-types").MiscInfoObj> & Record<"created" | "updated", Date> & Record<"stat", string> & {
            id: IsObjectId;
            status: import("../model-types").Status<import("../model-types").OfModelLvl1Types<T>["S"], "J">;
        }> & Partial<import("../model-types").ModelLvl2SelfRefs<T, "J">>;
        preview: Partial<import("../model-types").OfModelLvl1Types<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").OfModelLvl1Types<T>["S"]>>;
    }, {}>;
    isObjectId: (q: any) => q is IsObjectId;
    constructor(core: OBACoreApi<null>, config: ModelFactoryConfig<T>);
    createSchema: () => Schema<import("../model-types").OfModelLvl1Types<T>["I"] & Partial<{
        desc: string;
    } & import("../model-types").MiscInfoObj> & Record<"created" | "updated", Date> & Record<"stat", string> & {
        id: IsObjectId;
        status: import("../model-types").Status<import("../model-types").OfModelLvl1Types<T>["S"], "I">;
    } & import("mongoose").Document & import("../model-types").ModelLvl2SelfRefs<T, "I"> & {
        json: () => Partial<import("../model-types").OfModelLvl1Types<T>["J"] & Partial<{
            desc: string;
        } & import("../model-types").MiscInfoObj> & Record<"created" | "updated", Date> & Record<"stat", string> & {
            id: IsObjectId;
            status: import("../model-types").Status<import("../model-types").OfModelLvl1Types<T>["S"], "J">;
        }> & Partial<import("../model-types").ModelLvl2SelfRefs<T, "J">>;
        preview: Partial<import("../model-types").OfModelLvl1Types<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").OfModelLvl1Types<T>["S"]>>;
    }>;
    init: () => Promise<this>;
    getSelectedData: (s: ModelQueries<T>["select"], R: ModelInstance<T>[]) => any[];
}
