/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Schema, SchemaOptions } from "mongoose";
import OBACore from "@onebro/oba-core";
import { Enum, AllOfType, AnyBoolean } from "@onebro/oba-common";
import { Model, ModelPopulationRef } from "../model-types";
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
    core: OBACore;
    model: Model<T>["ctr"];
    config: ModelFactoryConfig<T>;
    autopopulate: (o: Model<T>["instance"], s?: AnyBoolean) => Promise<Model<T>["instance"]>;
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
    core: OBACore;
    config: ModelFactoryConfig<T>;
    constructor(core: OBACore, config: ModelFactoryConfig<T>);
    get m(): import("mongoose").Model<import("../model-types").IsModelSignature<T>["I"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k]["arr"] extends true | 1 ? (import("../model-types").IsModelSignature<T>["I"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : any) & {
        json: () => import("../model-types").IsModelSignature<T>["J"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; });
        preview: import("../model-types").IsModelSignature<T>["P"];
    })[] : import("../model-types").IsModelSignature<T>["I"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : any) & {
        json: () => import("../model-types").IsModelSignature<T>["J"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; });
        preview: import("../model-types").IsModelSignature<T>["P"];
    }; }) & {
        json: () => import("../model-types").IsModelSignature<T>["J"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; });
        preview: import("../model-types").IsModelSignature<T>["P"];
    } & import("mongoose").Document, {}>;
    createSchema: () => Schema<import("../model-types").IsModelSignature<T>["I"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k]["arr"] extends true | 1 ? (import("../model-types").IsModelSignature<T>["I"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : any) & {
        json: () => import("../model-types").IsModelSignature<T>["J"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; });
        preview: import("../model-types").IsModelSignature<T>["P"];
    })[] : import("../model-types").IsModelSignature<T>["I"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : any) & {
        json: () => import("../model-types").IsModelSignature<T>["J"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; });
        preview: import("../model-types").IsModelSignature<T>["P"];
    }; }) & {
        json: () => import("../model-types").IsModelSignature<T>["J"] & (import("../model-types").IsModelSignature<T>["R"] extends undefined ? {} : { [k_1 in import("@onebro/oba-common").Keys<import("../model-types").IsModelSignature<T>["R"]>]: import("../model-types").IsModelSignature<T>["R"][k_1]["arr"] extends true | 1 ? import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]][] : import("../model-types").ModelL2<T>[import("../model-types").IsModelSignature<T>["R"][k_1]["out"]]; });
        preview: import("../model-types").IsModelSignature<T>["P"];
    } & import("mongoose").Document>;
    init: () => Promise<this>;
    getSelectedData: (s: Model<T>["queries"]["select"], R: Model<T>["instance"][]) => any[];
}
