import OBACoreApi from "@onebro/oba-core-api";
import { Keys } from "@onebro/oba-common";
import { ModelInstance } from "../model-types";
import { ModelFactoryConstructors } from "../model-factories";
import { ModelControllerReqUserRole } from "./model-controller-reqs";
import { ModelControllerType } from "./model-controller-types";
export interface ModelController<Ev, Hub, k extends Keys<Hub>, Roles> extends ModelControllerType<Ev, Hub, k, Roles> {
}
export declare class ModelController<Ev, Hub, k extends Keys<Hub>, Roles> {
    core: OBACoreApi<Ev>;
    constructor(core: OBACoreApi<Ev>);
    unauthorized: (s: string) => never;
    isAuth: (okto: string, privileges?: string[]) => void;
    isRole: (role: ModelControllerReqUserRole<Roles>, roles: ModelControllerReqUserRole<Roles>[]) => never;
    isBadStatus: (o: ModelInstance<Hub[k]>) => boolean;
    init$: (constructors: ModelFactoryConstructors<Ev, Hub>) => Promise<this>;
}
