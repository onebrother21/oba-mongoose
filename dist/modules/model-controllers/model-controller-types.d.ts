import OBACoreApi from "@onebro/oba-core-api";
import { Keys, Values } from "@onebro/oba-common";
import { ModelInstance, ModelStatuses } from "../model-types";
import { ModelFactoryHub } from "../model-factories";
import { ModelControllerMethods, ModelControllerReqUserRole } from "./model-controller-reqs";
export declare type ModelControllerType<Ev, Hub, k extends Keys<Hub>, Roles> = ModelControllerMethods<Hub[k], Roles> & {
    core: OBACoreApi<Ev>;
    factories: ModelFactoryHub<Ev, Hub>;
    privileges: string[];
    badStatuses: Values<ModelStatuses<Hub[k]>>[];
    unauthorized: (s: string) => void;
    isAuth: (okto: string, priv?: string[]) => void;
    isRole: (role: ModelControllerReqUserRole<Roles>, roles: ModelControllerReqUserRole<Roles>[]) => void;
    isBadStatus: (o: ModelInstance<Hub[k]>) => boolean;
};
