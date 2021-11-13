import { Schema } from "mongoose";
import OBACoreApi from "@onebro/oba-core-api";
import { IsObjectId, ModelInstance, ModelQueries } from "../model-types";
import { ModelFactoryType, ModelFactoryConfig } from "./model-factory-types";
export interface ModelFactory<Ev, T> extends ModelFactoryType<Ev, T> {
}
export declare class ModelFactory<Ev, T> {
    core: OBACoreApi<Ev>;
    config: ModelFactoryConfig<T>;
    get m(): import("mongoose").Model<import("../model-types").OfModelLvl1Types<T>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").Status<import("../model-types").OfModelLvl1Types<T>["S"], "I">;
    } & import("mongoose").Document & import("../model-types").ModelLvl2SelfRefs<T, "I"> & {
        json: () => Partial<import("../model-types").OfModelLvl1Types<T>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: IsObjectId;
            status: import("../model-types").Status<import("../model-types").OfModelLvl1Types<T>["S"], "J">;
        }> & Partial<import("../model-types").ModelLvl2SelfRefs<T, "J">>;
        preview: Partial<import("../model-types").OfModelLvl1Types<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").OfModelLvl1Types<T>["S"]>>;
    }, {}>;
    isObjectId: (q: any) => q is IsObjectId;
    constructor(core: OBACoreApi<Ev>, config: ModelFactoryConfig<T>);
    createSchema: () => Schema<import("../model-types").OfModelLvl1Types<T>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").Status<import("../model-types").OfModelLvl1Types<T>["S"], "I">;
    } & import("mongoose").Document & import("../model-types").ModelLvl2SelfRefs<T, "I"> & {
        json: () => Partial<import("../model-types").OfModelLvl1Types<T>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: IsObjectId;
            status: import("../model-types").Status<import("../model-types").OfModelLvl1Types<T>["S"], "J">;
        }> & Partial<import("../model-types").ModelLvl2SelfRefs<T, "J">>;
        preview: Partial<import("../model-types").OfModelLvl1Types<T>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").OfModelLvl1Types<T>["S"]>>;
    }>;
    init: () => Promise<this>;
    getSelectedData: (s: ModelQueries<T>["select"], R: ModelInstance<T>[]) => any[];
}
