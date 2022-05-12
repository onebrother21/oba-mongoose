import OBACore from "@onebro/oba-core";
import { Values } from "@onebro/oba-common";
import { Model } from "../model-types";
import { ModelControllerMethods, ModelControllerReqUserRole } from "./model-controller-reqs";
export declare type ModelControllerType<R, T> = ModelControllerMethods<R, T> & {
    core: OBACore;
    privileges: string[];
    badStatuses: Values<Model<T>["statuses"]>[];
    unauthorized: (s: string) => void;
    isAuth: (okto: string, priv?: string[]) => void;
    isRole: (role: ModelControllerReqUserRole<R>, R: ModelControllerReqUserRole<R>[]) => void;
    isBadStatus: (o: Model<T>["instance"]) => boolean;
};
export interface ModelController<R, T> extends ModelControllerType<R, T> {
}
export declare class ModelController<R, T> {
    core: OBACore;
    constructor(core: OBACore);
    unauthorized: (s: string) => never;
    isAuth: (okto: string, privileges?: string[]) => void;
    isRole: (role: ModelControllerReqUserRole<R>, R: ModelControllerReqUserRole<R>[]) => never;
    isBadStatus: (o: Model<T>["instance"]) => boolean;
}
