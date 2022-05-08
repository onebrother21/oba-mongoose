/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Schema, SchemaOptions } from "mongoose";
import OBACoreApi from "@onebro/oba-core-api";
import { Enum, AllOfType } from "@onebro/oba-common";
import { IsObjectId, Model, ModelPopulationRef } from "../model-types";
export declare type SchemaDefinition = any;
export declare type ModelFactoryConfig<T> = {
    modelName: string;
    businessName: string;
    collectionName: string;
    definition: SchemaDefinition;
    refs: ModelPopulationRef[];
    virtuals: Enum<{
        get?: (...a: any) => any;
        set?: (...a: any) => void;
    }>;
    methods: Partial<AllOfType<Model<T>["instance"], Function>>;
    statuses: Model<T>["statuses"];
    opts: SchemaOptions;
};
export interface ModelFactory<T> {
    core: OBACoreApi;
    model: Model<T>["ctr"];
    config: ModelFactoryConfig<T>;
    autopopulate: (o: Model<T>["instance"], s?: boolean | 0 | 1) => Promise<Model<T>["instance"]>;
    create_: (c: Model<T>["config"]) => Promise<Model<T>["instance"]>;
    create: (c: Model<T>["config"]) => Promise<Model<T>["instance"]>;
    find: (q: Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
    findR: (q: Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
    fetch: (q: Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
    exists: (q: Model<T>["fetches"]) => Promise<boolean>;
    shouldNotExist: (q: Model<T>["fetches"]) => Promise<void>;
    update_: (q: Model<T>["fetches"], u: Model<T>["updates"]) => Promise<Model<T>["instance"]>;
    update: (q: Model<T>["fetches"], u: Model<T>["updates"]) => Promise<Model<T>["instance"]>;
    updateMany: (q: Model<T>["fetches"], u: Model<T>["updates"]) => Promise<Model<T>["instance"][]>;
    remove_: (q: Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
    remove: (q: Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
    removeMany: (q: Model<T>["fetches"]) => Promise<(Model<T>["instance"])[]>;
    query: (q: Model<T>["queries"]) => Promise<Model<T>["json"][]>;
    search: (q: string) => Promise<Model<T>["json"][]>;
    count: (q?: Model<T>["queries"]) => Promise<number | any>;
}
export declare class ModelFactory<T> {
    core: OBACoreApi;
    config: ModelFactoryConfig<T>;
    constructor(core: OBACoreApi, config: ModelFactoryConfig<T>);
    get m(): import("mongoose").Model<import("../model-types").IsModelSignature<T>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], true> : never;
        stat: string;
    } & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k]["arr"] extends true | 1 ? (import("../model-types").IsModelSignature<T>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], true> : never;
        stat: string;
    } & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : any) & {
        json: () => Partial<import("../model-types").IsModelSignature<T>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: string;
            status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], false> : never;
            stat: string;
        }> & Partial<import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; }>;
        preview: Partial<import("../model-types").IsModelSignature<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").IsModelSignature<T>["S"]>>;
    })[] : import("../model-types").IsModelSignature<T>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], true> : never;
        stat: string;
    } & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : any) & {
        json: () => Partial<import("../model-types").IsModelSignature<T>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: string;
            status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], false> : never;
            stat: string;
        }> & Partial<import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; }>;
        preview: Partial<import("../model-types").IsModelSignature<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").IsModelSignature<T>["S"]>>;
    }; }) & {
        json: () => Partial<import("../model-types").IsModelSignature<T>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: string;
            status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], false> : never;
            stat: string;
        }> & Partial<import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; }>;
        preview: Partial<import("../model-types").IsModelSignature<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").IsModelSignature<T>["S"]>>;
    } & import("mongoose").Document, {}>;
    isObjectId: (q: any) => q is IsObjectId;
    createSchema: () => Schema<import("../model-types").IsModelSignature<T>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], true> : never;
        stat: string;
    } & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k]["arr"] extends true | 1 ? (import("../model-types").IsModelSignature<T>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], true> : never;
        stat: string;
    } & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : any) & {
        json: () => Partial<import("../model-types").IsModelSignature<T>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: string;
            status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], false> : never;
            stat: string;
        }> & Partial<import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; }>;
        preview: Partial<import("../model-types").IsModelSignature<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").IsModelSignature<T>["S"]>>;
    })[] : import("../model-types").IsModelSignature<T>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], true> : never;
        stat: string;
    } & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : any) & {
        json: () => Partial<import("../model-types").IsModelSignature<T>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: string;
            status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], false> : never;
            stat: string;
        }> & Partial<import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; }>;
        preview: Partial<import("../model-types").IsModelSignature<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").IsModelSignature<T>["S"]>>;
    }; }) & {
        json: () => Partial<import("../model-types").IsModelSignature<T>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: string;
            status: import("../model-types").IsModelSignature<T>["S"] extends import("@onebro/oba-common").Strings<undefined> ? import("@onebro/oba-common").Status<import("../model-types").IsModelSignature<T>["S"], false> : never;
            stat: string;
        }> & Partial<import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; }>;
        preview: Partial<import("../model-types").IsModelSignature<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").IsModelSignature<T>["S"]>>;
    } & import("mongoose").Document>;
    init: () => Promise<this>;
    getSelectedData: (s: Model<T>["queries"]["select"], R: Model<T>["instance"][]) => any[];
}
