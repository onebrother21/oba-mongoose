import OBACoreApi from "@onebro/oba-core-api";
import { Keys, Values } from "@onebro/oba-common";
import { ModelInstance, ModelStatuses } from "../model-types";
import { ModelFactoryConstructors, ModelFactoryHub } from "../model-factories";
import { ModelControllerMethods, ModelControllerReqUserRole } from "./model-controller-reqs";
export declare type ModelControllerType<TT, k extends Keys<TT>, Roles> = ModelControllerMethods<TT[k], Roles> & {
    core: OBACoreApi<null>;
    factories: ModelFactoryHub<TT>;
    privileges: string[];
    badStatuses: Values<ModelStatuses<TT[k]>>[];
    unauthorized: (s: string) => void;
    isAuth: (okto: string, priv?: string[]) => void;
    isRole: (role: ModelControllerReqUserRole<Roles>, roles: ModelControllerReqUserRole<Roles>[]) => void;
    isBadStatus: (o: ModelInstance<TT[k]>) => boolean;
};
export interface ModelController<TT, k extends Keys<TT>, Roles> extends ModelControllerType<TT, k, Roles> {
}
export declare class ModelController<TT, k extends Keys<TT>, Roles> {
    core: OBACoreApi<null>;
    constructor(core: OBACoreApi<null>);
    unauthorized: (s: string) => never;
    isAuth: (okto: string, privileges?: string[]) => void;
    isRole: (role: ModelControllerReqUserRole<Roles>, roles: ModelControllerReqUserRole<Roles>[]) => never;
    isBadStatus: (o: ModelInstance<TT[k]>) => boolean;
    init$: (constructors: ModelFactoryConstructors<TT>) => Promise<this>;
}
