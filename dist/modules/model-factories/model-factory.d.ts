import { Schema } from "mongoose";
import OBACoreApi from "@onebro/oba-core-api";
import { IsObjectId, Model } from "../model-types";
import { ModelFactoryType, ModelFactoryConfig } from "./model-factory-types";
export interface ModelFactory<Ev, Sig> extends ModelFactoryType<Ev, Sig> {
}
export declare class ModelFactory<Ev, Sig> {
    core: OBACoreApi<Ev>;
    config: ModelFactoryConfig<Sig>;
    constructor(core: OBACoreApi<Ev>, config: ModelFactoryConfig<Sig>);
    get m(): import("mongoose").Model<import("../model-types").OfModelLvl1Signature<Sig>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").Status<import("../model-types").OfModelLvl1Signature<Sig>["S"], "I">;
    } & import("mongoose").Document & import("../model-types").ModelLvl2SelfRefs<Sig, "I"> & {
        json: () => Partial<import("../model-types").OfModelLvl1Signature<Sig>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: IsObjectId;
            status: import("../model-types").Status<import("../model-types").OfModelLvl1Signature<Sig>["S"], "J">;
        }> & Partial<import("../model-types").ModelLvl2SelfRefs<Sig, "J">>;
        preview: Partial<import("../model-types").OfModelLvl1Signature<Sig>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").OfModelLvl1Signature<Sig>["S"]>>;
    }, {}>;
    isObjectId: (q: any) => q is IsObjectId;
    createSchema: () => Schema<import("../model-types").OfModelLvl1Signature<Sig>["I"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
        id: IsObjectId;
        status: import("../model-types").Status<import("../model-types").OfModelLvl1Signature<Sig>["S"], "I">;
    } & import("mongoose").Document & import("../model-types").ModelLvl2SelfRefs<Sig, "I"> & {
        json: () => Partial<import("../model-types").OfModelLvl1Signature<Sig>["J"] & Omit<import("@onebro/oba-common").Entity, "id"> & {
            id: IsObjectId;
            status: import("../model-types").Status<import("../model-types").OfModelLvl1Signature<Sig>["S"], "J">;
        }> & Partial<import("../model-types").ModelLvl2SelfRefs<Sig, "J">>;
        preview: Partial<import("../model-types").OfModelLvl1Signature<Sig>["P"] & import("../model-types").ModelObjectIdStamp<import("../model-types").OfModelLvl1Signature<Sig>["S"]>>;
    }>;
    init: () => Promise<this>;
    getSelectedData: (s: Model<Sig>["queries"]["select"], R: Model<Sig>["instance"][]) => any[];
}
